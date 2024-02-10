# Тестовое задание

Решение выполнять на TypeScript и Node.js, допускается использование любых библиотек. Готовое решение запушить в этот репозиторий.

Запросить список заказов в CSV по URL: `https://leadball.ru/testtask/`. Для доступа необходимо использовать авторизацию по протоколу [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), с именем пользователя таким же, как у вас на GitHub, и паролем, равным имени пользователя. В таблице сумма заказа указана в копейках.

Затем из полученной таблицы нужно вычислить среднюю сумму заказа для заказов с российским номером телефона и с опцией доставки — самовывоз.

Среднюю сумму округлить до копеек и отформатировать в рублях с копейками, отделенными запятой, например: `1234,56`. Отправить POST-запрос с результатом на URL `https://leadball.ru/testtask/result/` в формате JSON с телом:

`{
  "average ": "1234,56"
}`

Во втором запросе использовать такую же авторизацию.

---

Конечный стек:

-  node js
-  typescript
-  express
-  axios
-  csvtojson
