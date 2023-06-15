const {pool} = require("../database")

const getBooks = async (request,response) => 
{
    try
    {
     
        let respuesta;
        let sql = "SELECT * FROM book WHERE id_user = ?";
        let params = [request.params.id_user];
        let res = await pool.query(sql,params);
        
        if (res[0].length > 0){
            respuesta = {
            error:false,
            codigo:200,
            mensaje:"Libros disponibles",
            data: res[0]};
        }else{
            respuesta = {
            error:true,
            codigo:200,
            mensaje:"No hay libros",
            data: null};
        }
        response.send(respuesta)
    }
    catch(err)
    {
        console.log(err);
    }
}
const getBooksID = async (request,response) => 
{
    try
    {
        let params = [];
        let sql = "SELECT * FROM book  WHERE id_user = ? AND id_book= ?";
        params = [request.params.id_user,
                request.params.id_book];
        let res = await pool.query(sql,params);
        console.log(res)
        
        if (res[0].length > 0){
            respuesta = {
            error:false,
            codigo:200,
            mensaje:"Libros disponibles",
            data: res[0]};
        }else{
            respuesta = {
            error:true,
            codigo:200,
            mensaje:"No hay libros",
            data: null};
        }
        response.send(respuesta)
        console.log(respuesta.data)
    }
    catch (err)
    {
        console.log(err);
    }
}

// const postBook = async (request,response) => 
// {
//     try
//     {
//         console.log(request.body)
//         let params = [];
//         let sql = "INSERT INTO book (id_user,title,type,author,price,photo) VALUES (?, ?, ?, ?, ?, ?)";
//         params = [request.body.id_user,
//                 request.body.title,
//                 request.body.type,
//                 request.body.author,
//                 request.body.price,
//                 request.body.photo];
//                 console.log(sql);
//         let [result] = await pool.query(sql,params);
//         console.log(result);
        
//         if (res[0].length > 0){
//             respuesta = {
//             error:false,
//             codigo:200,
//             mensaje:"Libros disponibles",
//             data: res[0]};
//         }else{
//             respuesta = {
//             error:true,
//             codigo:200,
//             mensaje:"No hay libros",
//             data: null};
//         }
//         response.send(respuesta)}
//     catch (error)
//     {
//         response.send(error)
//     }
// }

// const putBook = async (request, response) => 
// {
//     try
//     {
//         console.log(request.body)
//         let params = [];
//         let sql = "UPDATE book SET id_user = ?, title = ?, type = ?, author = ?, price = ?, photo = ? WHERE id_book = ?";
//         params = [request.body.id_book,
//                 request.body.id_user,
//                 request.body.title,
//                 request.body.type,
//                 request.body.author,
//                 request.body.price,
//                 request.body.photo];
//         console.log(sql);
//         let [result] = await pool.query(sql,params);
//         if (result)
//             response.send(result);
//         else 
//             response.send("-1");

//     }
//     catch (error)
//     {
//         response.send(error)
//     }
// } 

const deleteBook = async (request,response) =>
{
    try
    {
        let params = [];
        let sql = "DELETE FROM book WHERE id_book = ?";
        console.log(sql);
        params = [request.params.id_book]
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


module.exports = {getBooks, getBooksID, deleteBook}
//  postBook, putBook