export const vistaHome = ( req , res) => {
        res.render("home", {
            layout:"main",
            title : "Bienvenidos a Node Express y Handlebars 2024",
        })
}