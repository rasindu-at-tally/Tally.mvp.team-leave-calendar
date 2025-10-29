from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import csv
import io
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/export-csv', methods=['POST'])
def export_csv():
    try:
        data = request.get_json()
        leaves = data.get('leaves', [])
        
        if not leaves:
            return jsonify({'error': 'No leave data provided'}), 400
        
        # Get all unique members
        members = sorted(set(leave['name'] for leave in leaves))
        
        # Generate date range (from today to Mar 2026, excluding weekends)
        today = datetime.now()
        start_date = datetime(today.year, today.month, today.day)
        end_date = datetime(2026, 3, 31)  # March 31, 2026
        
        # Generate all working days in the range
        all_dates = []
        current_date = start_date
        
        while current_date <= end_date:
            day_of_week = current_date.weekday()
            # Monday=0, Sunday=6, so weekdays are 0-4
            if day_of_week < 5:  # Not Saturday or Sunday
                all_dates.append(current_date)
            current_date += timedelta(days=1)
        
        # Format dates for display (DD-Mon format)
        def format_date(date):
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            return f"{date.day:02d}-{months[date.month - 1]}"
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header row
        header = ['Resource'] + [format_date(date) for date in all_dates]
        writer.writerow(header)
        
        # Write data rows for each member
        for member in members:
            row = [member]
            
            # Get all leaves for this member
            member_leaves = [l for l in leaves if l['name'] == member]
            
            # For each date, check if member has leave
            for date in all_dates:
                date_str = date.strftime('%Y-%m-%d')
                
                # Check if this date falls within any leave period
                has_leave = False
                leave_indicator = ''
                
                for leave in member_leaves:
                    start = datetime.strptime(leave['startDate'], '%Y-%m-%d')
                    end = datetime.strptime(leave['endDate'], '%Y-%m-%d')
                    
                    if start <= date <= end:
                        has_leave = True
                        leave_indicator = 'P' if leave['leaveType'] == 'planned' else 'T'
                        break
                
                row.append(leave_indicator if has_leave else '')
            
            writer.writerow(row)
        
        # Get CSV content
        csv_content = output.getvalue()
        output.close()
        
        # Create response with CSV file
        response = make_response(csv_content)
        filename = f"Team_Leaves_{datetime.now().strftime('%Y-%m-%d')}.csv"
        response.headers['Content-Disposition'] = f'attachment; filename={filename}'
        response.headers['Content-Type'] = 'text/csv'
        
        return response
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

