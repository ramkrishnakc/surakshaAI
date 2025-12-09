# SurakshaAI

## Project Overview
SurakshyaAI is a mobile-first platform (Android & iOS) for Nepal aimed at improving personal and community safety using AI and real-time alerts. It integrates emergency notifications, crime reporting, location tracking, predictive analytics, and AI-based recommendations.

  ## Target Users
  - Individuals (commuters, students, workers)
  - Community Watch Groups
  - Local Police and Emergency Responders

  ## Core Value
  Instant crime/emergency alert, real-time location sharing, predictive risk notifications, and safety guidance.

## High-Level Features
The high-level features of the application can be summarized as follows:

  ## A. User Features
  1. User Registration & Profile:
    - Phone number/email verification
    - Profile setup with emergency contacts
    - Optional government ID verification for higher trust

  2. Real-Time Emergency Alerts:
    - Panic button to alert authorities & emergency contacts
    - Auto-detection of accidents (via smartphone sensors)
    - Location sharing in real-time
    - AI categorization of the emergency (crime, health, accident, fire, natural disaster)

  3. Crime Reporting:
    - Report crimes with type, location, description, images/videos
    - AI-assisted detection of sensitive content or urgency
    - Anonymous reporting option
    - Crime status updates (investigation, solved, ongoing)

  4. Community Safety Feed:
    - Map-based display of recent incidents
    - AI risk scoring for areas based on frequency of incidents
    - Notifications for high-risk zones nearby
    - Users can mark safe/unsafe areas

  5. Predictive Safety Alerts (AI):
    - Predict potential hotspots using historical crime data
    - Suggest safer routes for commuting
    - Personalized safety notifications based on behavior and location

  6. Emergency Contacts & Communication:
    - Auto call or SMS to saved emergency contacts
    - In-app chat with nearby users during emergency
    - Integration with local police and hospitals

  7. Safety Score & Gamification:
    - Users get a safety score based on reporting and responsiveness
    - Rewards or badges for active users who contribute to community safety

  ## B. Admin / Authorities Features
  1. Dashboard for Law Enforcement:
    - Live incident feed with location, type, and severity
    - AI suggestions for resource deployment
    - Analytics for crime trends and patterns
    - Emergency response coordination

  2. Verification & Content Moderation:
    - Validate reports from users
    - Handle false reports, spam, or misuse
    - Analytics for trust scoring of users

  3. Government & NGO Integration:
    - Share crime and safety data with municipal authorities
    - Alerts for natural disasters or civil emergencies

  ## C. AI & ML Features
  1. Crime Prediction Model:
    - Uses historical data, time, location, and demographics to predict crime risk
    - Helps notify users in advance

  2. Incident Categorization:
    - AI automatically tags report types
    - Detects urgent situations (fire, medical, violent crime)

  3. Route Safety Optimization:
    - Suggests safest route to destination based on past incidents
    - Integrates with Google Maps or Mapbox

  4. Anomaly Detection:
    - Detects unusual patterns in reporting (e.g., spike in incidents in an area)

  ## D. Tech & Platform Features
    - Mobile-first (Android & iOS, using Flutter or React Native)
    - Backend: Node.js + Express or Python + FastAPI
    - Database: MongoDB (NoSQL for flexible reporting data)
    - AI Models: Python (PyTorch or TensorFlow)
    - Push Notifications: Firebase Cloud Messaging (FCM)
    - Real-Time Location: WebSockets or MQTT
    - Mapping: Mapbox / Google Maps API
    - Cloud Hosting: AWS / GCP

## User Story Breakdown:
  ### Epic 1: User Onboarding
    US 1.1: As a user, I want to register with my phone/email so I can securely use the app.
    US 1.2: As a user, I want to add emergency contacts so they can be notified during an emergency.
    US 1.3: As a user, I want to verify my identity optionally to increase trust in the community.

  ### Epic 2: Emergency Alerts
    US 2.1: As a user, I want to press a panic button to alert authorities and contacts immediately.
    US 2.2: As a user, I want my location to be shared in real-time during emergencies.
    US 2.3: As a user, I want AI to automatically categorize the type of emergency.

  ### Epic 3: Crime Reporting
    US 3.1: As a user, I want to report a crime with details and photos/videos.
    US 3.2: As a user, I want to report anonymously if I fear retaliation.
    US 3.3: As a user, I want updates on my reported incident.

  ### Epic 4: Safety Feed & Predictive Alerts
    US 4.1: As a user, I want to see a map of recent incidents in my area.
    US 4.2: As a user, I want AI to suggest safer routes based on crime trends.
    US 4.3: As a user, I want notifications about high-risk zones near me.

  ### Epic 5: Community & Gamification
    US 5.1: As a user, I want to mark areas as safe or unsafe.
    US 5.2: As a user, I want a safety score to see how active I am in the community.
    US 5.3: As a user, I want badges/rewards for helping community safety.

  ### Epic 6: Admin & Law Enforcement
    US 6.1: As an admin, I want a dashboard showing live incidents.
    US 6.2: As an admin, I want analytics for crime trends.
    US 6.3: As an admin, I want to verify or flag reports.

## System Architecture (High-Level)
  ### Client Side:
    - Flutter/React Native app (iOS & Android)
    - Maps & real-time location
    - Push notifications

  ### Backend:
    - API Layer: Node.js/Express or FastAPI
    - Database: MongoDB (users, reports, AI logs)
    - Real-Time Layer: WebSockets / MQTT for instant alerts
    - AI Service: Python microservice for prediction and categorization
    - Notification Service: FCM or OneSignal

  ### Cloud & Infrastructure:
    - AWS: EC2/Lambda, S3 for media, DynamoDB or MongoDB Atlas
    - GCP alternative: Firebase for auth, Firestore for database, AI Platform for ML models
    - CI/CD: GitHub Actions or GitLab CI

  * Optional Advanced Features:
    - Wearable Integration: Panic button on smartwatch or wearable devices.
    - Voice Activation: Trigger alert using voice commands.
    - Community Chatrooms: Localized safety discussion channels.
    - AI Image Analysis: Detect violence or fire in uploaded videos/photos.
    - Government Data Integration: Real-time access to police data feeds.

## 🧠 Website Concept Overview

* Goal: To establish trust, security, and innovation — positioning SurakshyaAI as Nepal’s leading smart crime and emergency alert system.

* Target Audience:
  - Everyday users (citizens who want personal safety)
  - Law enforcement agencies
  - NGOs & local governments
  - Tech/media interested in AI-driven safety initiatives

* Tone: Modern, reliable, human-centered, and tech-driven.

## 🧩 Website Structure (Pages & Design Ideas)

## 1. Home Page

Purpose: First impression — communicate mission, show value, and guide users to download the app.

Sections:

1. Hero Section:
  - Bold tagline: “Stay Safe. Stay Informed. Powered by AI.”
  - Background: subtle animated map of Nepal with glowing “safety points.”
  - CTA Buttons: “Download App” and “Report an Incident”
  - Visual: Mockup of mobile app with map & panic button UI

2. Features Preview:
  - Three highlight cards:
    - 🚨 Instant Emergency Alerts
    - 🧠 AI-Powered Crime Prediction
    - 🗺️ Live Safety Map

  - Hover animations and subtle shadows

3. How It Works:
  - 3-step visual infographic: 1. Detect → 2. Alert → 3. Respond
  - Interactive scrolling showing how SurakshyaAI connects user → AI → authorities.

4. Community Impact / Stats:
  - Dynamic counters: “Crimes Reported,” “Lives Saved,” “Safe Zones Created”
  - Testimonials from users or police representatives

5. App Download Section:
  - QR code + buttons for Play Store and App Store

6. Footer:
  - Quick links, contact info, social media, privacy policy, and language toggle (English/Nepali)

## 2. About Page

Purpose: Build credibility and show the story behind SurakshyaAI.

Sections:

1. Mission statement & vision (“AI for Safer Nepal”)
2. The Team (founders, advisors, tech experts)
3. Partners (police, NGOs, local government logos)
4. Timeline of development milestones

Design Style:
  - White background with blue highlights
  - Portrait cards for team members with hover animation

## 3. Features Page
Purpose: Explain the platform capabilities clearly and visually.

Sections:

1. Individual feature breakdown:
  - Panic button & real-time tracking
  - AI-based threat detection
  - Safety map visualization
  - Anonymous reporting system
  - Predictive route safety

2. Interactive demo (mini animation of alert flow)

Design Style:
  - Grid-based layout with icons, motion graphics, and mini illustrations

## 4. Safety Insights (Blog / News)
Purpose: Educate the public on safety, AI use in law enforcement, and awareness.

Sections:
  - Blog cards (article thumbnails with summary)
  - Category filters (Crime Prevention, Tech & AI, Community Stories)
  - Featured AI analysis reports on Nepal’s safety zones

## 5. Contact / Support Page
Purpose: Let users report issues, connect for partnerships, or get support.

Sections:
  - Contact form (Name, Email, Message)
  - Social links
  - Emergency hotlines
  - Support categories (User issue, Partnership, Media, Government)

## 6. Admin / Authority Portal (Login Page)
Purpose: Entry point for law enforcement and verified personnel.

Design:
  - Clean, dark mode UI
  - Login with 2FA
  - Short tagline: “Authorized Access Only”

## 🎨 Color Palette Suggestions
The color scheme must convey trust, safety, and intelligence.

| Color | Purpose | Hex Code |
|---|---|---|
| Deep Navy Blue | Primary (trust, security) | #0B1B3C
| Electric Blue	| Accent for AI/tech feel |	#007BFF
| Cyan Blue	| Interactive highlights |	#00C4FF
| Soft Gray	| Background panels |	#F5F6FA
| Bright Red	| Emergency attention |	#E63946
| White	| Clean base |	#FFFFFF
| Black (80%)	| Text contrast	| #222222

## Font Style:
  - Headings: Poppins or Montserrat (modern, bold)
  - Body: Inter or Open Sans
  - Numbers: Roboto Mono (for dashboards)

## UI Style Keywords:
  🔹 Clean | 🔹 Minimal | 🔹 Map-integrated | 🔹 Futuristic accents | 🔹 Accessible

## 🧱 UI Design Concepts
  1. Map-Focused Elements: Integrate a live map aesthetic throughout the site (animated dots or pulsing zones).
  2. AI Glow Effects: Subtle gradients around key interactive areas to emphasize “intelligence.”
  3. Glassmorphism Cards: Slight transparency for modern, elevated look.
  4. Micro-interactions: Button ripple effects, hover shadows, dynamic counters.