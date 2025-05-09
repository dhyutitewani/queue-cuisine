import cv2
import numpy as np
import pandas as pd

from ultralytics import YOLO

from .tracker import *
pentering, pexiting = 0, 0

# Load YOLOv8 model
model = YOLO('./yolov8s.pt')

def process_video():

    # Define polygon areas (area1: exit, area2: entry)
    area1 = [(312, 388), (289, 390), (474, 469), (497, 462)]
    area2 = [(279, 392), (250, 397), (423, 477), (454, 469)]

    # Mouse callback to get coordinates (for debugging)
    def RGB(event, x, y, flags, param):
        if event == cv2.EVENT_MOUSEMOVE:
            colorsBGR = [x, y]
            print(colorsBGR)    

    cv2.namedWindow('RGB')
    cv2.setMouseCallback('RGB', RGB)

    # Load video
    cap = cv2.VideoCapture('peoplecount2.mp4')

    # Use built-in class names
    class_list = model.names

    # Tracker and people counters
    count = 0
    tracker = Tracker()

    people_entering = {}
    entering = set()

    people_exiting = {}
    exiting = set()

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        count += 1
        if count % 1 != 0:
            continue

        frame = cv2.resize(frame, (1020, 500))

        # YOLO prediction
        results = model(frame, verbose=False)
        detections = results[0].boxes.data
        px = pd.DataFrame(detections).astype("float")

        person_detections = []

        for _, row in px.iterrows():
            x1, y1, x2, y2, _, class_id = map(int, row[:6])
            class_name = class_list[class_id]
            if class_name == 'person':
                person_detections.append([x1, y1, x2, y2])

        # Update tracker
        tracked_ids = tracker.update(person_detections)

        for bbox in tracked_ids:
            x3, y3, x4, y4, id = bbox

            # Check if person is entering area2 (entry area)
            if cv2.pointPolygonTest(np.array(area2, np.int32), (x4, y4), False) >= 0:
                people_entering[id] = (x4, y4)
                cv2.rectangle(frame, (x3, y3), (x4, y4), (0, 0, 255), 2)

            if id in people_entering and id not in entering:
                if cv2.pointPolygonTest(np.array(area1, np.int32), (x4, y4), False) >= 0:
                    entering.add(id)
                    cv2.rectangle(frame, (x3, y3), (x4, y4), (0, 255, 0), 2)
                    cv2.circle(frame, (x4, y4), 5, (255, 0, 255), -1)
                    cv2.putText(frame, str(id), (x3, y3), cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 255, 255), 1)

                    pentering = len(entering)

                    # Print the count of people entering
                    print(f"People entering: {len(entering)}")

            # Check if person is exiting area1 (exit area)
            if cv2.pointPolygonTest(np.array(area1, np.int32), (x4, y4), False) >= 0:
                people_exiting[id] = (x4, y4)
                cv2.rectangle(frame, (x3, y3), (x4, y4), (0, 255, 0), 2)

            if id in people_exiting and id not in exiting:
                if cv2.pointPolygonTest(np.array(area2, np.int32), (x4, y4), False) >= 0:
                    exiting.add(id)
                    cv2.rectangle(frame, (x3, y3), (x4, y4), (255, 0, 255), 2)
                    cv2.circle(frame, (x4, y4), 5, (255, 0, 255), -1)
                    cv2.putText(frame, str(id), (x3, y3), cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 255, 255), 1)
                    
                    pexiting = len(exiting)

                    # Print the count of people exiting
                    print(f"People exiting: {len(exiting)}")

        # Draw polygons
        cv2.polylines(frame, [np.array(area1, np.int32)], True, (255, 0, 0), 2)
        cv2.putText(frame, '1', (504, 471), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 0), 1)

        cv2.polylines(frame, [np.array(area2, np.int32)], True, (255, 0, 0), 2)
        cv2.putText(frame, '2', (466, 485), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 0), 1)

        # Display count on the frame
        cv2.putText(frame, f'In: {len(entering)}', (60, 80), cv2.FONT_HERSHEY_COMPLEX, 0.7, (0, 0, 255), 2)
        cv2.putText(frame, f'Out: {len(exiting)}', (60, 140), cv2.FONT_HERSHEY_COMPLEX, 0.7, (255, 0, 255), 2)

        # Show the frame
        cv2.imshow("RGB", frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

process_video()