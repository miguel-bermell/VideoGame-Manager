const roleValidation = (role) => {
  const roles = Array.isArray(role) ? role : [role]; // Si se le pasa un string lo convierte a un array y lo guarda en la constante roles.
  return (req, res, next) => {
    if (![...roles, "admin"].includes(req.user?.role))
      throw new Error("You can't access here");
    next();
  };
};

module.exports = roleValidation;
