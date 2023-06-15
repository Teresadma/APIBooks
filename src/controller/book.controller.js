const {pool} = require("../database")

const getBooks = async (request,response) => 
{
    try
    {
        let params = [];
        let sql = "SELECT * FROM book INNER JOIN user ON (book.id_user = user.id_user) WHERE user.id_user = ?";
        params = [request.params.id_user];
        let [result] = await pool.query(sql,params);
        
        if (result)
            response.json(result);
        else 
            console.log("-1");
    }
    catch
    {
        console.log(err);
    }
}
const getBooksID = async (request,response) => 
{
    try
    {
        let params = [];
        let sql = "SELECT * FROM book INNER JOIN user ON (book.id_user = user.id_user) WHERE user.id_user = ? AND id_book= ?";
        params = [request.params.id_user,
                request.params.id_book];
        let [result] = await pool.query(sql,params);
        
        if (result)
            response.send(result);
        else 
            response.send("-1");
    }
    catch
    {
        console.log(err);
    }
}

const postBook = async (request,response) => 
{
    try
    {
        console.log(request.body)
        let params = [];
        let sql = "INSERT INTO book (id_user,title,type,author,price,photo) VALUES (?, ?, ?, ?, ?, ?)";
        params = [request.body.id_user,
                request.body.title,
                request.body.type,
                request.body.author,
                request.body.price,
                request.body.photo];
                console.log(sql);
        let [result] = await pool.query(sql,params);
        console.log(result);
        
        if (result.insertId)
            response.send(String(result.insertId));
        else 
            response.send("-1");
    }
    catch (error)
    {
        response.send(error)
    }
}

const putBook = async (request, response) => 
{
    try
    {
        console.log(request.body)
        let params = [];
        let sql = "UPDATE book SET id_user = ?, title = ?, type = ?, author = ?, price = ?, photo = ? WHERE id_book = ?";
        params = [request.body.id_book,
                request.body.id_user,
                request.body.title,
                request.body.type,
                request.body.author,
                request.body.price,
                request.body.photo];
        console.log(sql);
        let [result] = await pool.query(sql,params);
        if (result)
            response.send(result);
        else 
            response.send("-1");

    }
    catch (error)
    {
        response.send(error)
    }
} 

const deleteBook = async (request,response) =>
{
    try
    {
        console.log(request.body)
        let params = [];
        let sql = "DELETE FROM book WHERE id_book = ?";
        console.log(sql);
        params = [request.body.id_book]
        let [result] = await pool.query(sql,params);
        if (result)
            response.send(result);
        else 
            response.send("-1");

    }
    catch (error)
    {
        response.send(error)
    }
}


module.exports = {getBooks, getBooksID, postBook, putBook, deleteBook}