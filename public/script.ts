// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('loginForm') as HTMLFormElement
//   form.addEventListener('submit', function (event: Event) {
//     event.preventDefault()

//     const formData = new FormData(form)

//     /**
//      * @description
//      * Record recibe dos tipos de valores para guardar elementos y sus valores de un formulario
//      * @string Es el nombre(key) del input
//      * @FormDataEntryValues Es el tipo de dato que puede llegar a tener el formulario (string o file)
//      */
//     const formObject: Record<string, FormDataEntryValue> = {}

//     formData.forEach((value, key) => {
//       formObject[key] = value
//     })

//     const { user, password, remember } = formObject

//     console.log({ user, password, remember })

//     console.log(`Usuario: ${user}, Contraseña: ${password}, Recordarme: ${remember}`)
//   })
// })
