export const getMenuItems = (req, res, next) => {
    try {
        if (req.session.user) {
            const {
                role
            } = req.session.user;
            console.log(role)
            switch (role) {
                case 'administrator':
                    res.send({
                        success: true,
                        menu: ['Dashboard', 'Monitoring', 'Operator', 'Tasks', 'Statistics', 'Settings']
                    })
                    break;
                case 'operator':
                    res.send({
                        success: true,
                        menu: ['Dashboard', 'Operator', 'Tasks']
                    })

                    break;
                case 'analitician':
                    res.send({
                        success: true,
                        menu: ['Dashboard', 'Monitoring', 'Operator', 'Tasks', 'Statistics']
                    })

                    break;
                default:
                    console.log('Pieron wie kto to')
                    break;
            }
        } else {
            next()
        }

    } catch (error) {
        console.log(`Permissions menu get error ${error}`)
    }
}
export const getPage = (req, res, next) => {
    try {
        const {
            role
        } = req.user;
        const {
            page
        } = req.body;
        switch (role) {
            case 'administrator': {
                const pages = ['/dashboard', '/monitoring', '/operator', '/tasks', '/statistics', '/settings', '/settings/users', '/settings/machines']
                if (pages.indexOf(page.toLowerCase()) > -1) {
                    res.send({
                        success: true
                    })
                } else {
                    res.send({
                        success: false
                    })
                }
                break;
            }

            case 'operator': {
                const pages = ['dashboard', 'operator', 'tasks', 'statistics']
                if (pages.indexOf(page.toLowerCase()) > -1) {
                    res.send({
                        success: true
                    })
                } else {
                    res.send({
                        success: false
                    })
                }

                break;
            }

            case 'analitician': {
                const pages = ['dashboard', 'monitoring', 'operator', 'tasks', 'statistics']
                if (pages.indexOf(page.toLowerCase()) > -1) {
                    res.send({
                        success: true
                    })
                } else {
                    res.send({
                        success: false
                    })
                }

                break;
            }
            default:
                console.log('Pieron wie kto to')
                break;
        }
    } catch (error) {
        console.log(`Get page error ${error}`)
    }
}