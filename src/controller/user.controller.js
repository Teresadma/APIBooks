const {pool} = require("../database")

const postRegister = async (request,response) => 
{
    try
    {
        console.log(request.body)
        let params = [];
        let sql = "INSERT INTO user (name_user,last_name_user,email,photo,password) VALUES (?, ?, ?, ?, ?)";
        params = [request.body.name_user,
                request.body.last_name_user,
                request.body.email,
                request.body.photo,
                request.body.password];
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

const postLogin  = async (request,response) =>
{
    try 
    {
        console.log(request.body);
        let params = [];
        let sql = "SELECT id_user, name_user, last_name_user, email, photo FROM user WHERE email = ? AND password = ?";
        params = [request.body.email,
                request.body.password];

        let [result] = await pool.query (sql, params);

        if (result.length === 0){
            response.json({
                error:true,
                codigo:200,
                mensaje:"Los datos son incorrectos"});
        }else{
            response.json(result[0]);
        }}
        catch (err)
        {
            console.log(err)
        }
}

const editProfile = async (request, response) => {
    try {
      let params = [];
      const sql = "UPDATE user SET name_user = ?, last_name_user = ?, email = ?, photo = ? WHERE id_user = ?";
      params = [request.body.name_user, request.body.last_name_user, request.body.email, request.body.photo, request.body.id_user];
      await pool.query(sql, params);
  
      response.json({
        error: true,
        message: "Perfil actualizado correctamente"
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        error: true,
        message: "Ocurrió un error al actualizar el perfil"
      });
    }
  };
  
module.exports = {postRegister,postLogin,editProfile}