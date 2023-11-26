// axios config

export default function ({ $axios, redirect, store, app }) {
  $axios.onRequest((config) => {
    // ? add accepted language

    // console.log(app.i18n.locale);
    config.headers.common['Accept-Language'] = app.i18n.locale

    // ? add token to each request
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    // code === 400 || this refer when api failed
  })
}
