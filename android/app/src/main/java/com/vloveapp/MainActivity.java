package com.vloveapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;

import org.devio.rn.splashscreen.SplashScreen;

import cn.jpush.android.api.JPushInterface;
public class MainActivity extends ReactActivity {
    private PermissionListener listener; // <- add this attribute
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        MobclickAgent.openActivityDurationTrack(false);
        //开启友盟统计调试模式
        UMConfigure.setLogEnabled(true);
        JPushInterface.setDebugMode(true);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        JPushInterface.init(this);
        super.onCreate(savedInstanceState);
    }
    @Override
    protected String getMainComponentName() {
        return "projeact";
    }
    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
        MobclickAgent.onResume(this);
    }
    public void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult(requestCode, resultCode, data);

//        mReactInstanceManager.onActivityResult(requestCode, resultCode, data);
    }
    }
