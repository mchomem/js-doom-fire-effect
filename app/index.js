Index = {
    self: this

    , start: function () {
        self.$fireCanvas = document.getElementById('fireCanvas')
        self.$firePixelsArray = []
        self.$fireWidth = 40
        self.$fireHeight = 40
        self.$debug = false
        self.$fireColorsPalette = [
            { "r": 7, "g": 7, "b": 7 }
            , { "r": 31, "g": 7, "b": 7 }
            , { "r": 47, "g": 15, "b": 7 }
            , { "r": 71, "g": 15, "b": 7 }
            , { "r": 87, "g": 23, "b": 7 }
            , { "r": 103, "g": 31, "b": 7 }
            , { "r": 119, "g": 31, "b": 7 }
            , { "r": 143, "g": 39, "b": 7 }
            , { "r": 159, "g": 47, "b": 7 }
            , { "r": 175, "g": 63, "b": 7 }
            , { "r": 191, "g": 71, "b": 7 }
            , { "r": 199, "g": 71, "b": 7 }
            , { "r": 223, "g": 79, "b": 7 }
            , { "r": 223, "g": 87, "b": 7 }
            , { "r": 223, "g": 87, "b": 7 }
            , { "r": 215, "g": 95, "b": 7 }
            , { "r": 215, "g": 95, "b": 7 }
            , { "r": 215, "g": 103, "b": 15 }
            , { "r": 207, "g": 111, "b": 15 }
            , { "r": 207, "g": 119, "b": 15 }
            , { "r": 207, "g": 127, "b": 15 }
            , { "r": 207, "g": 135, "b": 23 }
            , { "r": 199, "g": 135, "b": 23 }
            , { "r": 199, "g": 143, "b": 23 }
            , { "r": 199, "g": 151, "b": 31 }
            , { "r": 191, "g": 159, "b": 31 }
            , { "r": 191, "g": 159, "b": 31 }
            , { "r": 191, "g": 167, "b": 39 }
            , { "r": 191, "g": 167, "b": 39 }
            , { "r": 191, "g": 175, "b": 47 }
            , { "r": 183, "g": 175, "b": 47 }
            , { "r": 183, "g": 183, "b": 47 }
            , { "r": 183, "g": 183, "b": 55 }
            , { "r": 207, "g": 207, "b": 111 }
            , { "r": 223, "g": 223, "b": 159 }
            , { "r": 239, "g": 239, "b": 199 }
            , { "r": 255, "g": 255, "b": 255 }
        ]

        this.createFireDataStructure()
        this.createFireSource()
        this.renderFire()

        setInterval(this.calculateFirePropagation, 50)
    }

    , createFireDataStructure: function () {
        const numberOfPixels = self.$fireWidth * self.$fireHeight

        for (var i = 0; i < numberOfPixels; i++) {
            $firePixelsArray[i] = 0
        }
    }

    , calculateFirePropagation: function () {
        for (var column = 0; column <= self.$fireWidth; column++) {
            for (var row = 0; row < self.$fireHeight; row++) {
                var pixelIndex = column + (self.$fireWidth * row)
                Index.updateFireIntensityPerPixel(pixelIndex)
            }
        }

        Index.renderFire()
    }

    , updateFireIntensityPerPixel: function (currentPixelIndex) {
        var belowPixelIndex = currentPixelIndex + self.$fireWidth

        if (belowPixelIndex >= self.$fireWidth * self.$fireHeight) {
            return
        }

        var decay = Math.floor(Math.random() * 3)
        var belowPixelFireIntensity = self.$firePixelsArray[belowPixelIndex]
        var newFireIntensity =
            (belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0)
        self.$firePixelsArray[currentPixelIndex - decay] = newFireIntensity
    }

    , renderFire: function () {
        var table = document.createElement('table')
        table.cellPadding = 0
        table.cellSpacing = 0

        for (var row = 0; row < self.$fireHeight; row++) {
            var tr = document.createElement('tr');

            for (var column = 0; column < self.$fireWidth; column++) {
                var pixelIndex = column + (self.$fireWidth * row)
                var fireIntensity = self.$firePixelsArray[pixelIndex]

                var td = document.createElement('td')

                if (self.$debug === true) {
                    var divPixelIndex = document.createElement('div')
                    divPixelIndex.setAttribute('class', 'pixel-index')
                    divPixelIndex.innerText = pixelIndex
                    td.innerHTML = fireIntensity
                    td.appendChild(divPixelIndex)
                } else {
                    var color = self.$fireColorsPalette[fireIntensity]
                    var colorString = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'
                    td.setAttribute('class', 'pixel')
                    td.style.backgroundColor = colorString
                }

                tr.appendChild(td)
            }

            table.appendChild(tr)
        }

        self.$fireCanvas.innerHTML = ''
        self.$fireCanvas.appendChild(table)
    }

    , createFireSource: function () {
        for (var column = 0; column <= self.$fireWidth; column++) {
            var overflowPixelIndex = self.$fireWidth * self.$fireHeight
            var pixelIndex = (overflowPixelIndex - self.$fireWidth) + column
            self.$firePixelsArray[pixelIndex] = 36
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    Index.start()
})
