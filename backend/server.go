package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"database/sql"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

type ListItem struct {
	ID             int    `json:"id"`
	Name           string `json:"name"`
	Description    string `json:"description"`
	Quantity       int    `json:"quantity"`
	Purchased      int    `json:"purchased"`
	ShoppingListID int    `json:"shoppingListId"`
}

type ListItems []ListItem

type RawListItemPayload struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
	Purchased   bool   `json:"purchased"`
}

type ErrorMessage struct {
	Message string `json:"message"`
}

type ShoppingList struct {
	ListItems []ListItem `json:"listItems"`
	OwnerID   int        `json:"ownerId"`
	ID        int        `json:"id"`
}

type ShoppingListOnly struct {
	ID      int `json:"id"`
	OwnerID int `json:"ownerId"`
}

type CreateShoppingListRequest struct {
    OwnerID int `json:"ownerId"`
    ListItems []RawListItemPayload `json:"listItems"`
}

func main() {
	router := mux.NewRouter()
	// return all the shopping lists with the id and the owner id
	router.HandleFunc("/shoppingList", getAllShoppingLists).Methods("GET")
	// create a new shopping list
	router.HandleFunc("/shoppingList", createShoppingList).Methods("POST")
	router.HandleFunc("/shoppingList/{id}", deleteShoppingList).Methods("DELETE")
	// get a shopping list by id
	router.HandleFunc("/shoppingList/{id}", getShoppingListById).Methods("GET")
	log.Println("Starting server on port 5000...")

	initializeDB()

	// Start the server
	log.Fatal(http.ListenAndServe(":5000", router))
}

func getAllShoppingLists(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, err := GetDBConnection()
	if err != nil {
		errorMsg := map[string]string{"message": "Database connection error"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)

		http.Error(w, string(jsonErrorMsg), http.StatusInternalServerError)
		return
	}

	rows, err := db.Query("select id, ownerId from shopping_lists")
	if err != nil {
		errorMsg := map[string]string{"message": "Database query error"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)

		http.Error(w, string(jsonErrorMsg), http.StatusInternalServerError)
		return
	}

    defer rows.Close()

	if rows.Next() == false {
		errorMsg := map[string]string{"message": "No shopping lists found"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)

		http.Error(w, string(jsonErrorMsg), http.StatusNotFound)
		return
	}

    allShoppingLists := []ShoppingListOnly{}
	for rows.Next() {

		var id int
		var ownerId int
		err = rows.Scan(&id, &ownerId)
		if err != nil {
			log.Fatal(err)
		}
		allShoppingLists = append(allShoppingLists, ShoppingListOnly{ID: id, OwnerID: ownerId})
	}

	json.NewEncoder(w).Encode(allShoppingLists)
}

func getShoppingListById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	shoppingListId, err := strconv.Atoi(params["id"])

	db, _ := GetDBConnection()
	// existingList, err := getShoppingListItemsById(id)
	var id int
	var ownerId int
	row := db.QueryRow("select id, ownerId from shopping_lists where id = ?", shoppingListId)

	err = row.Scan(&id, &ownerId)
	if err != nil {
		errorMsg := map[string]string{"message": "Shopping list not found"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)

		http.Error(w, string(jsonErrorMsg), http.StatusNotFound)
		return
	}

	// format the result into a shopping list
	var shoppingList ShoppingList
	shoppingList.ID = shoppingListId
	shoppingList.OwnerID = ownerId
	shoppingList.ListItems, _ = getShoppingListItemsById(shoppingListId)

	json.NewEncoder(w).Encode(shoppingList)
}

func createShoppingList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")


    var requestBody CreateShoppingListRequest
    err := json.NewDecoder(r.Body).Decode(&requestBody)
    if err != nil {
        errorMsg := map[string]string{"message": "Owner id is required as an integer."}
        jsonErrorMsg, _ := json.Marshal(errorMsg)
		http.Error(w, string(jsonErrorMsg), http.StatusBadRequest)
        return
    }

    ownerId := requestBody.OwnerID
    rawList := requestBody.ListItems

    // var rawList []RawListItemPayload

	db, _ := GetDBConnection()

	var listItems []ListItem
	// create the shoping list first
	result, err := db.Exec("INSERT INTO shopping_lists (ownerId) VALUES(?);", ownerId)
    
    defer db.Close()
	if err != nil {
        log.Fatal(err)
	}

	newShoppingListId, err := result.LastInsertId()

    // get the list items from the request body
    err = json.NewDecoder(r.Body).Decode(&rawList)
	// transform the raw list into a list of list items
	for _, item := range rawList {
		var purchasedInt int = 0
		if item.Purchased {
			purchasedInt = 1
		}
		listItems = append(listItems, ListItem{ID: item.ID, Name: item.Name, Description: item.Description, Quantity: item.Quantity, Purchased: purchasedInt, ShoppingListID: int(newShoppingListId)})
	}

    // insert the list items into the database
    for _, item := range listItems {
        addItemToShoppingList(db, int(newShoppingListId), item)

    }


	var newShoppingList ShoppingList

	newShoppingList.ID = int(newShoppingListId)
	newShoppingList.OwnerID = int(ownerId)
	newShoppingList.ListItems = listItems

	json.NewEncoder(w).Encode(newShoppingList)
}

func addItemToShoppingList(db *sql.DB, shoppingListId int, item ListItem) (int64, error) {
    result, err := db.Exec("INSERT INTO shopping_list_items (name, description, quantity, purchased, shoppingListId) VALUES(?, ?, ?, ?, ?);", item.Name, item.Description, item.Quantity, item.Purchased, shoppingListId)
    if err != nil {
        return 0, err
    }
    return result.LastInsertId()
}


func deleteItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	_, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}
}

func GetDBConnection() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./ShoppingListApp.db")
	if err != nil {
		return nil, err
	}
	return db, nil
}

func initializeDB() {
	db, err := GetDBConnection()
	sqlStmt := `
    create table shopping_lists (id integer not null primary key autoincrement, ownerId integer);
    create table shopping_list_items (id integer not null primary key autoincrement, name text, description text, quantity integer, purchased integer, shoppingListId integer);
    `
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s")
	}
}

func getShoppingListItemsById(shoppingListId int) (ListItems, error) {

	db, err := GetDBConnection()

	rows, err := db.Query("select id, name, description, quantity, purchased from shopping_list_items WHERE id = ?", shoppingListId)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var itemList []ListItem
	for rows.Next() {
		var id int
		var name string
		var description string
		var quantity int
		var purchased int

		err = rows.Scan(&id, &name, &description, &quantity, &purchased)
		if err != nil {
			log.Fatal(err)
		}

		itemList = append(itemList, ListItem{ID: id, Name: name, Description: description, Quantity: quantity, Purchased: purchased})
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return itemList, nil
}

func deleteShoppingList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse shopping list item ID from the URL path
	params := mux.Vars(r)
	itemId, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	// Get a database connection
	db, err := GetDBConnection()
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// Delete the shopping list
	stmt, err := db.Prepare("DELETE FROM shopping_lists WHERE id = ?")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(itemId)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Delete the shopping list items
	deleteListItemsStmt, _ := db.Prepare("DELETE FROM shopping_list_items WHERE  = ?")
	defer stmt.Close()

	_, err = deleteListItemsStmt.Exec(itemId)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Return a success message
	response := map[string]string{"message": "Shopping list deleted"}
	json.NewEncoder(w).Encode(response)
}
