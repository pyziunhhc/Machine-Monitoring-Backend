const checkPermissionToPage = (req, res, next) => {
    console.log()
    console.log('sprawdz dostep do strony')
    next()
}
export default checkPermissionToPage