package io.ionic.biponi;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.distribute.Distribute;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppCenter.start(getApplication(), "65ca507f-c007-4872-9e84-4f708a663e65",
                Analytics.class, Crashes.class, Distribute.class);
    }
}
