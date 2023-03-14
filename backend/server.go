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
	ListItems []ListItem `json:"shoppingListItems"`
	OwnerID   int        `json:"ownerId"`
	ID        int        `json:"id"`
}

type ShoppingListOnly struct {
	ID      int `json:"id"`
	OwnerID int `json:"ownerId"`
}

// Request Structs
type CreateShoppingListRequest struct {
	OwnerID   int                  `json:"ownerId"`
	ListItems []RawListItemPayload `json:"shoppingListItems"`
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/shoppingList", getAllShoppingListsHandler).Methods("GET")
	router.HandleFunc("/shoppingList", createShoppingListHandler).Methods("POST")
	router.HandleFunc("/shoppingList/{id}", deleteShoppingListHandler).Methods("DELETE")
	router.HandleFunc("/shoppingList/{id}", getShoppingListByIdHandler).Methods("GET")
	// router.HandleFunc("/shoppingList/{id}/item", addItemToShoppingListHandler).Methods("PUT")
	// router.HandleFunc("/shoppingList/{id}/item", addItemToShoppingListHandler).Methods("DELETE")
	log.Println("Starting server on port 5000")

	initializeDB()

	// Start the server
	log.Fatal(http.ListenAndServe(":5000", router))
}

// HTTP Handlers
func getAllShoppingListsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	allShoppingLists := getAllShoppingLists()

	if len(allShoppingLists) == 0 {
		errorMsg := map[string]string{"message": "No shopping lists found"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)

		http.Error(w, string(jsonErrorMsg), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(allShoppingLists)
}

func getShoppingListByIdHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	shoppingListId, err := strconv.Atoi(mux.Vars(r)["id"])

	if err != nil {
		errorMsg := map[string]string{"message": "Invalid shopping list id"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)
		http.Error(w, string(jsonErrorMsg), http.StatusBadRequest)
	}

	shoppingList := getShoppingListById(shoppingListId)

	if shoppingList.ID == 0 && shoppingList.OwnerID == 0 {
		errorMsg := map[string]string{"message": "No shopping list found with that id"}
		jsonErrorMsg, _ := json.Marshal(errorMsg)
		http.Error(w, string(jsonErrorMsg), http.StatusNotFound)

		return
	}

	log.Println(shoppingList)

	json.NewEncoder(w).Encode(shoppingList)
}

func deleteShoppingListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse shopping list item ID from the URL path
	params := mux.Vars(r)
	itemId, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	deletedList := deleteShoppingList(itemId)

	if deletedList.ID == 0 && deletedList.OwnerID == 0 {
		errorMsg := map[string]string{"message": "Shopping list not found."}
		jsonErrorMsg, _ := json.Marshal(errorMsg)
		http.Error(w, string(jsonErrorMsg), http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(deletedList)
}

func createShoppingListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var requestBody CreateShoppingListRequest
	err := json.NewDecoder(r.Body).Decode(&requestBody)

	if err != nil {
		errorMsg := map[string]string{"message": "Owner id is required as an integer."}
		jsonErrorMsg, _ := json.Marshal(errorMsg)
		http.Error(w, string(jsonErrorMsg), http.StatusBadRequest)
		return
	}

	// err = json.NewDecoder(r.Body).Decode(&rawList)
	newShoppingList := createShoppingList(requestBody)

	json.NewEncoder(w).Encode(newShoppingList)
}

// / database functions
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
		log.Printf("%q", err)
	}
}

func getAllShoppingLists() (allShoppingLists []ShoppingListOnly) {
	db, err := GetDBConnection()

	rows, err := db.Query("select id, ownerId from shopping_lists")
	defer rows.Close()

	var foundShoppingLists []ShoppingListOnly
	for rows.Next() {

		var id int
		var ownerId int
		err = rows.Scan(&id, &ownerId)
		if err != nil {
			log.Fatal(err)
		}
		foundShoppingLists = append(foundShoppingLists, ShoppingListOnly{ID: id, OwnerID: ownerId})
	}

	return foundShoppingLists

}

func getShoppingListById(shoppingListId int) (shoppingList ShoppingList) {
	db, _ := GetDBConnection()
	// existingList, err := getShoppingListItemsById(id)
	var id int
	var ownerId int
	row := db.QueryRow("select id, ownerId from shopping_lists where id = ?", shoppingListId)

	err := row.Scan(&id, &ownerId)
	var shoppingListToReturn ShoppingList

	if err != nil {
		if err == sql.ErrNoRows {
			log.Println("No rows were returned!")
		} else {
			log.Fatal(err)
		}
	} else {
		shoppingListToReturn.ID = shoppingListId
		shoppingListToReturn.OwnerID = ownerId
		shoppingListToReturn.ListItems, _ = getShoppingListItemsById(shoppingListId)
	}

	return shoppingListToReturn
}

func createShoppingList(request CreateShoppingListRequest) ShoppingList {
	// var rawList []RawListItemPayload
	db, _ := GetDBConnection()

	log.Println(request)
	ownerId := request.OwnerID
	rawList := request.ListItems

	var shoppingListItems []ListItem
	// create the shoping list first
	result, _ := db.Exec("INSERT INTO shopping_lists (ownerId) VALUES(?);", ownerId)

	defer db.Close()

	newShoppingListId, _ := result.LastInsertId()

	// get the list items from the request body
	// err = json.NewDecoder(r.Body).Decode(&rawList)
	// transform the raw list into a list of list items
	for _, item := range rawList {
		var purchasedInt int = 0
		if item.Purchased {
			purchasedInt = 1
		}
		var listItem ListItem
		listItem.ID = item.ID
		listItem.Name = item.Name
		listItem.Description = item.Description
		listItem.Quantity = item.Quantity
		listItem.Purchased = purchasedInt
		listItem.ShoppingListID = int(newShoppingListId)

		// add the list item to the database
		addItemToShoppingList(db, int(newShoppingListId), listItem)
		shoppingListItems = append(shoppingListItems, listItem)
	}
	var newShoppingList ShoppingList

	newShoppingList.ID = int(newShoppingListId)
	newShoppingList.OwnerID = int(ownerId)
	newShoppingList.ListItems = shoppingListItems

	return newShoppingList
}

func addItemToShoppingList(db *sql.DB, shoppingListId int, item ListItem) (int64, error) {
	result, err := db.Exec("INSERT INTO shopping_list_items (name, description, quantity, purchased, shoppingListId) VALUES(?, ?, ?, ?, ?);", item.Name, item.Description, item.Quantity, item.Purchased, shoppingListId)
	if err != nil {
		log.Println(err)
		return 0, err
	}
	log.Println("adding item to shopping list")
	return result.LastInsertId()
}

func getShoppingListItemsById(shoppingListId int) (ListItems, error) {

	db, err := GetDBConnection()

	rows, err := db.Query("select id, name, description, quantity, purchased from shopping_list_items WHERE shoppingListId = ?", shoppingListId)
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

func deleteShoppingList(shoppingListId int) ShoppingList {
	log.Printf("Deleting shopping list with ID %d", shoppingListId)

	// check if the shopping list exists
	existingList := getShoppingListById(shoppingListId)

	// Get a database connection
	db, _ := GetDBConnection()

	// make sure the shopping list exists
	var shoppingList ShoppingList
	shoppingList.ID = shoppingListId

	db.QueryRow("SELECT id, ownerId FROM shopping_lists WHERE id = ?", shoppingListId).Scan(&shoppingList.ID, &shoppingList.OwnerID)

	stmt, _ := db.Prepare("DELETE FROM shopping_lists WHERE id = ?")
	stmt.Exec(shoppingListId)

	// // Delete the shopping list items
	deleteListItemsStmt, _ := db.Prepare("DELETE FROM shopping_list_items WHERE shoppingListId = ?")

	deleteListItemsStmt.Exec(shoppingListId)

	return existingList
}
