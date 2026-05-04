package com.gramaangan

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Find views
        val tvHallStatus = findViewById<TextView>(R.id.tvHallStatus)
        val tvTodayEvent = findViewById<TextView>(R.id.tvTodayEvent)
        val btnViewCalendar = findViewById<Button>(R.id.btnViewCalendar)
        val btnRequestBooking = findViewById<Button>(R.id.btnRequestBooking)
        val btnMaintenanceJar = findViewById<Button>(R.id.btnMaintenanceJar)

        // Navigation
        btnViewCalendar.setOnClickListener {
            val intent = Intent(this, CalendarActivity::class.java)
            startActivity(intent)
        }

        btnRequestBooking.setOnClickListener {
            val intent = Intent(this, BookingActivity::class.java)
            startActivity(intent)
        }

        btnMaintenanceJar.setOnClickListener {
            val intent = Intent(this, MaintenanceActivity::class.java)
            startActivity(intent)
        }

        // Mocking logic for Hall Status
        // In a real app, this would check a database
        val isHallBookedToday = false 
        if (isHallBookedToday) {
            tvHallStatus.text = "Booked"
            tvHallStatus.setTextColor(resources.getColor(android.R.color.holo_red_dark))
            tvTodayEvent.text = "Event: Village Welfare Meeting"
        } else {
            tvHallStatus.text = "Available"
            tvHallStatus.setTextColor(resources.getColor(android.R.color.holo_green_dark))
            tvTodayEvent.text = "No events scheduled for today"
        }
    }
}
