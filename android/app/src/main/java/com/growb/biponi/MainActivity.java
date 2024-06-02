package com.growb.biponi;

import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import java.util.HashSet;
import java.util.Set;

public class MainActivity extends BridgeActivity {

    private static final Set<String> subscribedTopics = new HashSet<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FirebaseApp.initializeApp(this);

        // Check for notification permission (optional)
        requestNotificationPermission();
    }

    private void requestNotificationPermission() {
        // Use Manifest.permission.READ_EXTERNAL_STORAGE for older versions (< API level 23)
        int permissionCode = ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_EXTERNAL_STORAGE); // Use READ_EXTERNAL_STORAGE for pre-Android M
        if (permissionCode != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.READ_EXTERNAL_STORAGE}, 100);
        } else {
            // Permission already granted, check and subscribe to topics
            subscribeToTopics();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 100) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted, subscribe to topics
                subscribeToTopics();
            } else {
                // Handle permission denied case (optional)
            }
        }
    }

    private void subscribeToTopics() {
        Set<String> topicsToSubscribe = new HashSet<>();
        topicsToSubscribe.add("product-add");
        topicsToSubscribe.add("manufacturer-add");
        topicsToSubscribe.add("order-creation");

        for (String topic : topicsToSubscribe) {
            if (!subscribedTopics.contains(topic)) {
                FirebaseMessaging.getInstance().subscribeToTopic(topic)
                        .addOnCompleteListener(new OnCompleteListener<Void>() {
                            @Override
                            public void onComplete(@NonNull Task<Void> task) {
                                if (!task.isSuccessful()) {
                                    Log.w("TAG", "Subscribe failed", task.getException());
                                } else {
                                    Log.d("TAG", "Subscribed to topic: " + topic);
                                    subscribedTopics.add(topic);
                                }
                            }
                        });
            }
        }
    }
}
