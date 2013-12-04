package com.example.aero;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import org.apache.cordova.DroidGap;

public class Aero extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash2);
        super.loadUrl("file:///android_asset/www/home_v.3.0.html", 10000);
//        super.loadUrl("file:///android_asset/www/index_datepicker.html");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.aero, menu);
        return true;
    }
    
}
