// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const modifyUser = async (req, res, next) => {
  try {
    //Obtemeno id usuario.
    const { id } = req.params;
    //Obtenemo la info que queremofsfs
    const { password, user } = req.body;
    
    // Joi validation
    // Se validan los datos del user
    const schema = modifyUserJoi;
    const validation = schema.validate(req.body);
    //Por si hay un error de validasion
    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }
    // Buscamo el user
    // Get user by id
    const existingUser = await getUserById(id);
    
    // Si no existe el user o es imbecil
    if (!existingUser) {
      throw generateError(`No existe el usuario con el id:${id}`, 404);
    }
     
    // Update user
    await updateUserById(id, password, user);
    //Respuesta http con mensaje 
    // Res.send
    res.send({
      status: "ok",
      message: `El usuario con el id:${id} se ha actualizado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { modifyUser };
