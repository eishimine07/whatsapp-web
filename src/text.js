function hey() {
    let loading = true
    let textPlaceholder = 'Carregando'
    var counter = 0
    setTimeout(() => {
        console.log('!!!!DONEEEE!!!!!', loading)
        loading = false 
        counter = 10
    }, 500)
    for (var counter = 0; counter < 10; counter++) {
        if (counter > 4) {
            textPlaceholder = 'Carregando'
            counter = 0
            console.log(textPlaceholder)
        }

        textPlaceholder += '.'
        counter ++
        console.log(textPlaceholder)
    }

}

hey()