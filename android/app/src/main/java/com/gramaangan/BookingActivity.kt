package com.gramaangan

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class BookingActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_booking)

        val etName = findViewById<EditText>(R.id.etName)
        val spinnerPurpose = findViewById<Spinner>(R.id.spinnerPurpose)
        val tvDateDisplay = findViewById<TextView>(R.id.tvDateDisplay)
        val etTime = findViewById<EditText>(R.id.etTime)
        val btnSubmit = findViewById<Button>(R.id.btnSubmit)

        // Date selection logic (Simplified for beginner demo)
        tvDateDisplay.setOnClickListener {
            // In a real app, use DatePickerDialog
            Toast.makeText(this, "Opening Date Picker...", Toast.LENGTH_SHORT).show()
            tvDateDisplay.text = "2026-05-25" // Mock selection
        }

        btnSubmit.setOnClickListener {
            val name = etName.text.toString()
            val purpose = spinnerPurpose.selectedItem.toString()
            val date = tvDateDisplay.text.toString()
            val time = etTime.text.toString()

            if (name.isEmpty() || date == "Select Date" || time.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            } else {
                // Success
                val message = "Booking request for $name ($purpose) on $date at $time submitted!"
                Toast.makeText(this, message, Toast.LENGTH_LONG).show()
                
                // Close activity after short delay to simulate "storage" and return
                finish()
            }
        }
    }
}
