requirejs(["../node_modules/angular-lock/dist/angular-lock.min",
        "../node_modules/angular-jwt/dist/angular-jwt.min", "../node_modules/angular-ui-router/release/angular-ui-router.min", "app",
        "components/js/goalService", "components/auth/auth.service", "components/home/home.controller", "auth0-variables", "app.run"
    ],
    function(a, b, c, d, e, f, g, h, i, j) {
        alert("done loading scripts!");
    });
