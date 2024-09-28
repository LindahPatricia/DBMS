package com.xwiggy.food;

import com.xwiggy.food.dao.CartDaoImpl;
import com.xwiggy.food.dao.FoodDaoImpl;
import com.xwiggy.food.dao.UserDao;
import com.xwiggy.food.dao.UserDaoImpl;
import com.xwiggy.food.model.Cart;
import com.xwiggy.food.model.Food;
import com.xwiggy.food.model.Login;
import com.xwiggy.food.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;

@SpringBootTest
public class XwiggyApplicationTests {

    @Autowired
    UserDao userDao;

    @Autowired
    UserDaoImpl userDaoImpl;

    @Autowired
    FoodDaoImpl foodDao;

    @Autowired
    CartDaoImpl cartDao;

    @Test
    public void contextLoads() {
        Login login = new Login();
        login.setUsername("amank");
        login.setPassword("abcd1234");

        User user = userDaoImpl.validateUser(login);
        Assertions.assertEquals("Aman",user.getFirstname());
        Assertions.assertEquals("Kumar",user.getLastname());
        Assertions.assertEquals("aman@gmail.com",user.getEmail());
        Assertions.assertEquals(9585418,user.getPhone());
    }

    @Test
    public void checkFoodTable(){
        Food food = new Food();
        food.setId("abc");
        Food food1 = foodDao.validateFoodInfo(food.getId());
        Assertions.assertEquals("Coffee",food1.getItem());
        Assertions.assertEquals(50,food1.getPrice());
    }

    @Test
    public void checkCartDb(){
        List<Cart> carts = cartDao.getAllCart();
        Cart zero = carts.get(0);
        Assertions.assertEquals(0,zero.getQuantity1());
        Assertions.assertEquals(0,zero.getQuantity2());
        Assertions.assertEquals(0,zero.getQuantity3());
    }

    /*Test*/


}
