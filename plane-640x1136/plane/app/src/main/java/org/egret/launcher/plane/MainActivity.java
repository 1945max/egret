package org.egret.launcher.plane;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.FrameLayout;

import org.egret.launcher.egret_android_launcher.NativeActivity;
import org.egret.launcher.egret_android_launcher.NativeCallback;
import org.egret.launcher.egret_android_launcher.NativeLauncher;
import org.egret.runtime.launcherInterface.INativePlayer;

public class MainActivity extends NativeActivity {
    private final String token = "952aac7c818c67bd4e9ad0bee4fdf808b4fa762979d1dc3ad73fd71a66b578d4";

    /*
    * 设置是否显示FPS面板
    *   true: 显示面板
    *   false: 隐藏面板
    * Set whether to show FPS panel
    *   true: show FPS panel
    *   false: hide FPS panel
    * */
    private final boolean showFPS = true;

    private FrameLayout rootLayout = null;
    
    private Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        rootLayout = (FrameLayout)findViewById(R.id.rootLayout);

        launcher.initViews(rootLayout);

        setExternalInterfaces();

        /*
        * 设置是否自动关闭启动页
        *   1: 自动关闭启动页
        *   0: 手动关闭启动页
        * Set whether to close the startup page automatically
        *   1. close the startup page automatically
        *   0. close the startup page manually
        * */
        launcher.closeLoadingViewAutomatically = 1;

        /*
        * 设置是否每次启动都重新下载游戏资源
        *   0: 版本更新才重新下载
        *   1: 每次启动都重新下载
        * Set whether to re-download game resources each time the application starts
        *   0: re-download game resources if version updated
        *   1: re-download game resources each time the application starts
        * */
        launcher.clearGameCache = 0;

        /*
        * 设置runtime代码log的等级
        *   0: Debug
        *   1: Info
        *   2: Warning
        *   3: Error
        * Set log level for runtime code
        *   0: Debug
        *   1: Info
        *   2: Warning
        *   3: Error
        * */
        launcher.logLevel = 2;

        progressCallback = new NativeCallback() {
            @Override
            public void onCallback(String msg, int val) {
                switch (msg) {
                    case NativeLauncher.RequestingRuntime:
                        /*
                        * 向服务器请求runtime和游戏信息
                        * Request the server for runtime and game information
                        * */
                        break;
                    case NativeLauncher.LoadingRuntime:
                        /*
                        * 下载和加载runtime
                        * Download and load runtime
                        * */
                        break;
                    case NativeLauncher.RetryRequestingRuntime:
                        handler.postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                launcher.loadRuntime(token);
                            }
                        }, 1000);
                        break;
                    case NativeLauncher.LoadingGame:
                        /*
                        * 下载和加载游戏资源
                        * Download and load game resources
                        * */
                        launcher.startRuntime(showFPS);
                        break;
                    case NativeLauncher.GameStarted:
                        /*
                        * 游戏启动
                        * Game started
                        * */
                        break;
                    case NativeLauncher.LoadRuntimeFailed:
                        /*
                        * 加载runtime和游戏信息失败
                        * Loading runtime and game resources failed
                        * */
                        break;
                    default:

                        break;
                }
            }
        };
        launcher.loadRuntime(token);
    }

    private void setExternalInterfaces() {
        launcher.setExternalInterface("callNative", new INativePlayer.INativeInterface() {
            @Override
            public void callback(String s) {
                Log.d("Egret Launcher", s);
                launcher.callExternalInterface("callJS", "message from native");
            }
        });
    }
}
