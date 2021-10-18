const getMenu = (req, res, next) => {
    const {
        role
    } = req.cookies;
    switch (role) {
        case 'administrator': {
            res.send({
                dashboard: {
                    name: 'Dashboard',
                    href: '/dashboard',
                    className: 'fas fa-home'
                },
                monitoring: {
                    name: 'Monitoring',
                    href: '/monitoring',
                    className: 'fas fa-warehouse'
                },
                operator: {
                    name: 'Operator',
                    href: '/operator',
                    className: 'brak'
                },
                works: {
                    name: 'Zadania',
                    href: '/tasks',
                    className: 'fas fa-tasks'
                },
                reports: {
                    name: 'Raporty',
                    href: '/reports',
                    className: 'brak'
                },
                statistics: {
                    name: 'Statystyki',
                    href: '/stats/all',
                    className: 'fas fa-chart-bar'
                },

                settings: {
                    name: 'Ustawienia',
                    href: '/settings',
                    className: 'fas fa-cogs'
                },
            })
        }
        break;
    case 'analityk': {
        res.send({
            dashboard: {
                name: 'Dashboard',
                href: '/dashboard'
            },
            monitoring: {
                name: 'Monitoring',
                href: '/monitoring'
            },
            tasks: {
                name: 'Zadania',
                href: '/tasks'
            },
            reports: {
                name: 'Raporty',
                href: '/reports'
            },
            statistics: {
                name: 'Statystyki',
                href: '/stats/all'
            },
            settings: {
                name: 'Ustawienia',
                href: '/settings'
            },
        })
    }
    break;
    case 'operator': {
        res.send({
            work: {
                name: 'Operator',
                href: '/operator'
            },
            tasks: {
                name: 'Zadania',
                href: '/tasks'
            },
            settings: {
                name: 'Ustawienia',
                href: '/settings'
            },
            myWork: {
                name: 'Moje statystyki',
                href: '/stats/user'
            }
        })
    }
    }
}
const getSettings = (req, res, next) => {
    const role = req.cookies.role;

    switch (role) {
        case 'administrator': {
            res.send({
                server: {
                    name: 'Serwer'
                },
                users: {
                    name: 'Użytkownicy',
                    href: '/users'
                },
                email: {
                    name: 'Raporty mailowe',
                    href: '/reports/mail'
                },
                myAccount: {
                    name: 'Moje konto',
                },
                lockedMachines: {
                    name: 'Zablokowane maszyny',
                }
            })
        }
        break;
    case 'analityk': {
        res.send({
            myAccount: {
                name: 'Moje konto',
            },
            users: {
                name: 'Użytkownicy',
                href: '/users'
            },
        })
    }
    break;
    case 'operator': {
        res.send({
            myAccount: {
                name: 'Moje konto',
            }
        })
    }
    }

}
export default {
    getMenu,
    getSettings
}