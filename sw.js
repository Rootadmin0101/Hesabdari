const CACHE_NAME = 'hesab-v8-cache';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// مرحله نصب و ذخیره فایل‌ها در حافظه گوشی
self.addEventListener('install', e => {
  self.skipWaiting(); // اجبار به آپدیت فوری در صورت وجود نسخه جدید
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// مرحله فعال‌سازی و پاک کردن کش‌های قدیمی
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // حذف نسخه‌های قبلی برنامه از حافظه
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// مرحله فراخوانی فایل‌ها در حالت آفلاین
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
