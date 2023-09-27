    // useEffect(() => {
    //     console.log(menuu.map((item) => {
    //         return item.menu.map((item) => item.price)
    //     }))
    // }, [menuu])

    const menu = [

        {product: 'Chips', more: [
            {price: '20.00', list: 'small'},
            {price: '60.00', list: 'large'},
            {price: '40.00', list: 'medium'}
        ]},

        {product: 'Egg bread Sandwiche',  more: [
            {price: '8.80', list: '2 slice'},
            {price: '12.80', list: '3 slice'},
            {price: '14.80', list: '4 slice'},
            {price: '16.80', list: '6 slice'},
        ]},

        {product: 'Sphathlo',  more: [
            {price: '35.90',list: 'Russion and cheese'},
            {price: '37.90', list: 'Russion, cheese and latice'},
            {price: '30.90', list: 'vienna and polony'},
            {price: '45.90', list: 'Russion ,Vienna'}
        ]},
        {product: 'Burger',  more: [
            {price: '55.99', list: 'Cheese Burger'},
            {price: '60.99', list: 'Chicken Burger'},
            {price: '70.99', list: 'Beef Burger'},
            {price: '79.99', list: 'Ribs Burger'}
        ]},
        {product: 'Drinks/ Bevs', more: [
            { price: '19.99', list: ' 500ml Straberry Milkshake'},
            { price: '24.90', list: '2l Cold drink'},
            { price: '15.90', list: '500ml Slush'}
        ]}

    ]