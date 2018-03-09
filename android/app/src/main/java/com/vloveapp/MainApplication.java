package com.vloveapp;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.support.multidex.MultiDex;

import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.beefe.picker.PickerViewPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.microsoft.codepush.react.CodePush;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.theweflex.react.WeChatPackage;
import com.umeng.commonsdk.UMConfigure;
import com.zmxv.RNSound.RNSoundPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.jiguang.imui.messagelist.ReactIMUIPackage;
import cn.jpush.im.android.api.event.NotificationClickEvent;
import cn.jpush.reactnativejpush.JPushPackage;
import cn.reactnative.modules.qq.QQPackage;
import cn.reactnative.modules.weibo.WeiboPackage;
import io.jchat.android.JMessageReactPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    private boolean SHUTDOWN_TOAST = false;
    private boolean SHUTDOWN_LOG = false;
    private boolean SHUTDOWN_Ljm = false;
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG,"http://codepush.aityuan.com/"),
            new RNSoundPackage(),
            new RNFetchBlobPackage(),
            new WeChatPackage(),
            new PickerPackage(),
            new WeiboPackage(),
              new ReactNativeAudioPackage(),
            new JMessageReactPackage(SHUTDOWN_Ljm),
            new PickerViewPackage(),
              new ReactIMUIPackage(),
              new QQPackage(),
              new LinearGradientPackage(),
              new ImagePickerPackage(),
              new SplashScreenReactPackage(),
              new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
              new MyReactPackage()
      );
    }
  };
  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    UMConfigure.init(this,0,null);
    SoLoader.init(this, /* native exopackage */ false);
    SoLoader.init(this, /* native exopackage */ false);
  }
  public void onEvent(NotificationClickEvent event) {
    Intent notificationIntent = new Intent(this, MainActivity.class);
    this.startActivity(notificationIntent);// 自定义跳转到指定页面
  }

}
