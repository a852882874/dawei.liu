package com.vloveapp;

import android.annotation.TargetApi;
import android.app.AppOpsManager;
import android.content.ActivityNotFoundException;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.database.Cursor;
import android.net.Uri;
import android.os.Binder;
import android.os.Build;
import android.os.PowerManager;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.Method;

import static com.tencent.open.utils.Global.getPackageName;

/**
 * Created by Administrator on 2016/10/18.
 */
public class MyNativeModule extends ReactContextBaseJavaModule {
    private static Context mContext;
    PowerManager pm;
    PowerManager.WakeLock wakeLock;
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }
    @Override
    public String getName() {

        //返回的这个名字是必须的，在rn代码中需要这个名字来调用该类的方法。
        return "MyNativeModule";
    }
    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送信息给rn那边。
    @ReactMethod
    public void rnCallNative(String msg){
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public static boolean checkDeviceHasNavigationBar(Callback successBack) {
        boolean hasNavigationBar = false;
        try {
            Resources rs = mContext.getResources();
            int id = rs.getIdentifier("config_showNavigationBar", "bool", "android");
            if (id > 0) {
                hasNavigationBar = rs.getBoolean(id);
            }
            Class systemPropertiesClass = Class.forName("android.os.SystemProperties");
            Method m = systemPropertiesClass.getMethod("get", String.class);
            String navBarOverride = (String) m.invoke(systemPropertiesClass, "qemu.hw.mainkeys");
            if ("1".equals(navBarOverride)) {
                hasNavigationBar = false;
            } else if ("0".equals(navBarOverride)) {
                hasNavigationBar = true;
            }
        } catch (Exception e) {

        }
        successBack.invoke(hasNavigationBar);
        return hasNavigationBar;
    }
    @ReactMethod

    public Boolean isXiaoMiPhone (Callback successBack){
        if ("Xiaomi".equals(Build.MANUFACTURER)) {
            successBack.invoke(true) ;
            return true;
        }else {
            successBack.invoke(false) ;
            return false;
        }
    }
    @ReactMethod
    public boolean getRealFilePath(Uri uri, Callback successBack ) {
        if ( null == uri ) return false;
        final String scheme = uri.getScheme();
        String data = null;
        if ( scheme == null )
            data = uri.getPath();
        else if ( ContentResolver.SCHEME_FILE.equals( scheme ) ) {
            data = uri.getPath();
        } else if ( ContentResolver.SCHEME_CONTENT.equals( scheme ) ) {
            Cursor cursor = mContext.getContentResolver().query( uri, new String[] { MediaStore.Images.ImageColumns.DATA }, null, null, null );
            if ( null != cursor ) {
                if ( cursor.moveToFirst() ) {
                    int index = cursor.getColumnIndex( MediaStore.Images.ImageColumns.DATA );
                    if ( index > -1 ) {
                        data = cursor.getString( index );
                    }
                }
                cursor.close();
            }
        }
        successBack.invoke(data) ;
        return false;
    }
    @ReactMethod
    /**
     * 打开权限设置界面
     */
    public void openSetting() {
        try {
            Intent localIntent = new Intent(
                    "miui.intent.action.APP_PERM_EDITOR");
            localIntent.setClassName("com.miui.securitycenter",
                    "com.miui.permcenter.permissions.AppPermissionsEditorActivity");
            localIntent.putExtra("extra_pkgname", getPackageName());
            mContext.startActivity(localIntent);
        } catch (ActivityNotFoundException localActivityNotFoundException) {
            Intent intent1 = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            Uri uri = Uri.fromParts("package", getPackageName(), null);
            intent1.setData(uri);
            mContext.startActivity(intent1);
        }
    }
    /**
     * 判断悬浮窗权限
     *
     * @return
     * @param myNativeModule
     */
    @TargetApi(Build.VERSION_CODES.KITKAT)
    public static boolean isFloatWindowOpAllowed(MyNativeModule myNativeModule) {
        final int version = Build.VERSION.SDK_INT;
        if (version >= 19) {
            return checkOp(mContext, 24);  // AppOpsManager.OP_SYSTEM_ALERT_WINDOW
        } else {
            if ((mContext.getApplicationInfo().flags & 1 << 27) == 1 << 27) {
                return true;
            } else {
                return false;
            }
        }
    }
    /**
     * 检查权限
     * @param context
     * @param op
     * @return
     */
    @TargetApi(Build.VERSION_CODES.KITKAT)
    public static boolean checkOp(Context context, int op) {
        final int version = Build.VERSION.SDK_INT;

        if (version >= 19) {
            AppOpsManager manager = (AppOpsManager) context.getSystemService(Context.APP_OPS_SERVICE);
            try {
                Class<?> spClazz = Class.forName(manager.getClass().getName());
                Method method = manager.getClass().getDeclaredMethod("checkOp", int.class, int.class, String.class);
                int property = (Integer) method.invoke(manager, op,
                        Binder.getCallingUid(), context.getPackageName());
                Log.e("399", " property: " + property);

                if (AppOpsManager.MODE_ALLOWED == property) {
                    return true;
                } else {
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            Log.e("399", "Below API 19 cannot invoke!");
        }
        return false;
    }

    /**
     * 判断是否开启了悬浮窗权限
     * @return
     */
    @ReactMethod
    public boolean requestPermission(Callback successBack) {
        if (isFloatWindowOpAllowed(this)) {//已经开启 返回true 直接执行弹窗的方法
            successBack.invoke(true) ;
            return true;
        } else { //打开设置界面  去请求权限
            successBack.invoke(false) ;
            return false;
        }
    }

    @ReactMethod
    public void rnCallNativwesss(String msg){
//        String ToastStr = "<span style={{color:red}}>"+msg+"</span>";
//        Toast toast = Toast.makeText(mContext, msg,Toast.LENGTH_SHORT);
//        toast.setGravity(Gravity.CENTER, 0, 0);
//        toast.show();
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }
    @ReactMethod
    public void showTime(final String years, final String mource, final String day, final String houre, final String mm,final String ss) {
    }


}