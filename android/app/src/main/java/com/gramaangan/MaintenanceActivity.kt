package com.gramaangan

import android.os.Bundle
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MaintenanceActivity : AppCompatActivity() {

    private var currentFanCollected = 300
    private var currentChairCollected = 200

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maintenance)

        val pbFans = findViewById<ProgressBar>(R.id.pbFans)
        val tvFanProgress = findViewById<TextView>(R.id.tvFanProgress)
        val btnContributeFan = findViewById<Button>(R.id.btnContributeFan)

        val pbChairs = findViewById<ProgressBar>(R.id.pbChairs)
        val tvChairProgress = findViewById<TextView>(R.id.tvChairProgress)
        val btnContributeChair = findViewById<Button>(R.id.btnContributeChair)

        btnContributeFan.setOnClickListener {
            if (currentFanCollected < 500) {
                currentFanCollected += 50
                if (currentFanCollected > 500) currentFanCollected = 500
                
                pbFans.progress = currentFanCollected
                tvFanProgress.text = "₹$currentFanCollected / ₹500"
                Toast.makeText(this, "Thank you for contributing ₹50!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Goal reached! Thank you.", Toast.LENGTH_SHORT).show()
            }
        }

        btnContributeChair.setOnClickListener {
            if (currentChairCollected < 1000) {
                currentChairCollected += 100
                if (currentChairCollected > 1000) currentChairCollected = 1000
                
                pbChairs.progress = currentChairCollected
                tvChairProgress.text = "₹$currentChairCollected / ₹1000"
                Toast.makeText(this, "Thank you for contributing ₹100!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Goal reached! Thank you.", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
