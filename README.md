# 🚀 Real-Time Chat API

> A robust, secure, and scalable RESTful API for real-time messaging, built with Node.js, PostgreSQL, and Socket.io.

نظام خلفي (Backend) متكامل لتطبيق محادثة فورية، يدعم المحادثات الخاصة (1-on-1)، تسجيل الدخول الآمن عبر Google OAuth، والبث المباشر للرسائل والتحديثات باستخدام WebSockets. تم بناء المشروع مع التركيز على جودة الكود، الأمان، وتغطية الاختبارات.

---

## ✨ Key Features (المميزات الرئيسية)

- **🔐 Authentication:** تسجيل دخول آمن باستخدام **Google OAuth 2.0** وإدارة الجلسات (Sessions).
- **💬 Real-Time Messaging:** إرسال واستقبال الرسائل فورياً باستخدام **Socket.io**.
- **🔒 Private Chat:** نظام غرف خاصة لضمان وصول الرسائل للمستقبل المحدد فقط.
- **✏️ CRUD Operations:** إمكانية تعديل وحذف الرسائل مع التحقق من الصلاحيات (Policies).
- **🗄️ Database:** هيكلية بيانات قوية باستخدام **PostgreSQL** مع إدارة **Migrations** و **Seeds** عبر Knex.js.
- **🛡️ Security:** حماية المسارات (Middlewares) وفصل بيانات المستخدمين.
- **🧪 Testing:** تغطية اختبارات شاملة (**+90% Code Coverage**) باستخدام **Jest** & **Supertest**.
- **docker 🐳 Dockerized:** بيئة تشغيل معزولة وجاهزة باستخدام **Docker** و **Docker Compose**.
- **📑 Documentation:** توثيق كامل للـ API باستخدام **Swagger UI**.

---

## 🛠️ Tech Stack (التقنيات المستخدمة)

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** PostgreSQL
*   **ORM/Query Builder:** Knex.js
*   **Real-Time Engine:** Socket.io
*   **Authentication:** Passport.js (Google Strategy)
*   **Testing:** Jest, Supertest
*   **Documentation:** Swagger (OpenAPI)
*   **Containerization:** Docker

---

## 🔗 API Documentation (التوثيق)

يمكنك استعراض وتجربة جميع الروابط (Endpoints) مباشرة عبر المتصفح بعد تشغيل السيرفر:
> **http://localhost:3000/api-docs**

---