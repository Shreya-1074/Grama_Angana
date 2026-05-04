package com.gramaangan

import android.os.Bundle
import android.widget.CalendarView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class CalendarActivity : AppCompatActivity() {

    // Hardcoded booked dates for demo (Year-Month-Day)
    private val bookedDates = listOf("2026-5-10", "2026-5-15", "2026-5-20")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_calendar)

        val calendarView = findViewById<CalendarView>(R.id.calendarView)
        val tvSelectedDate = findViewById<TextView>(R.id.tvSelectedDate)
        val tvStatus = findViewById<TextView>(R.id.tvStatus)

        calendarView.setOnDateChangeListener { _, year, month, dayOfMonth ->
            // Note: Month is 0-indexed in CalendarView (0 = January)
            val monthCorrected = month + 1
            val dateString = "$year-$monthCorrected-$dayOfMonth"
            tvSelectedDate.text = "Selected: $dateString"

            if (bookedDates.contains(dateString)) {
                tvStatus.text = "BOOKED"
                tvStatus.setTextColor(resources.getColor(android.R.color.holo_red_dark))
            } else {
                tvStatus.text = "AVAILABLE"
                tvStatus.setTextColor(resources.getColor(android.R.color.holo_green_dark))
            }
        }
    }
}
