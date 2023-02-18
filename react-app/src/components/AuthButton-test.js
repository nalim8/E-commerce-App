useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth/login');
        console.log(response)
        setLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error(error);
      }
    };
    checkLoginStatus();
  }, []);


  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });