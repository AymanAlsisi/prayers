let d = new Date()
let day = d.getDate()
let month = d.getMonth() + 1
let year = d.getFullYear()

if (month < 10) {
    month = "0" + month
}

let myDate = `${day}-${month}-${year}`
document.querySelector('#head-date').innerHTML = myDate;

const Cities = [
    { en: "Atabara", ar: "عطبرة" },
    { en: "Khartoum", ar: "الخرطوم" },
    { en: "Port Sudan", ar: "بورتسودان" },
    { en: "Kasala", ar: "كسلا" },
    { en: "Al Qadarif", ar: "القضارف" },
    { en: "Kusti", ar: "كوستي" },
    { en: "Wd Madani", ar: "ود مدني" },
    { en: "Dongola", ar: "دنقلا" },
    { en: "Wadi Halfa", ar: "وادي حلفا" },
    { en: "Al Fashir", ar: "الفاشر" },
    { en: "Al Jinena", ar: "الجنينة" },
    { en: "Nyala", ar: "نيالا" },
    { en: "Al Deain", ar: "الضعين" },
    { en: "Zalingei", ar: "زالنجي" },
    { en: "Al Ubayyid", ar: "الأبيّض" },
    { en: "Kadugli", ar: "كادقلي" },
    { en: "Al Fulah", ar: "الفولة" },
    { en: "Sennar", ar: "سنار" },
    { en: "Al Damazin", ar: "الدمازين" }
]

document.querySelector('select').addEventListener("change", () => {
    document.querySelector('.prayers').innerHTML = `<h1 class="loading"></h1>`
})

setInterval(() => {document.querySelector('.loading').innerHTML += "."}, 400)
setInterval(() => {document.querySelector('.loading').innerHTML = ""}, 1400)


const getPrayerTimings = (city) => {
    if (city === "") {
        document.querySelector('.prayers').innerHTML = 
        `<div class="empty">
            <h1 class="empty-text">لم يتم تحديد مدينة بعد</h1>
        </div>`
    }
    else if (city === "no") {
        document.querySelector('.prayers').innerHTML = 
        `<div class="empty">
            <h1 class="empty-text">لم يتم تحديد مدينة بعد</h1>
        </div>`
    } else {
        axios.get(`https://api.aladhan.com/v1/timingsByAddress/${myDate}?address=${city}%20Sudan`)
            .then(res => {
                let hiri = `${res.data.data.date.hijri.weekday.ar} ${res.data.data.date.hijri.day} ${res.data.data.date.hijri.month.ar} ${res.data.data.date.hijri.year}`
                let prayers = res.data.data.timings
                document.querySelector('.prayers').innerHTML =
                    `<h3 id="head-hiri">${hiri}</h3>
                    <ul class="prayers-list">
                        <li><p class="prayers-title">العشاء</p><p>${prayers.Isha}</p></li>
                        <li><p class="prayers-title">المغرب</p><p>${prayers.Maghrib}</p></li>
                        <li><p class="prayers-title">العصر</p><p>${prayers.Asr}</p></li>
                        <li><p class="prayers-title">الظهر</p><p>${prayers.Dhuhr}</p></li>
                        <li><p class="prayers-title">الشروق</p><p>${prayers.Sunrise}</p></li>
                        <li><p class="prayers-title">الفجر</p><p>${prayers.Fajr}</p></li>
                    </ul>`
            })
        if (city === 'Atabara') {
            city = 'عطبرة'
        }
        else if (city === 'Khartoum') {
            city = 'الخرطوم'
        }
        else if (city === 'Port Sudan') {
            city = 'بورتسودان'
        }
        else if (city === 'Wd Madani') {
            city = 'ود مدني'
        }
        else if (city === 'Wadi Halfa') {
            city = 'وادي حلفا'
        }
        else if (city === 'Al Qadarif') {
            city = 'القضارف'
        }
        else if (city === 'Nyala') {
            city = 'نيالا'
        }
        else if (city === 'Kasala') {
            city = 'كسلا'
        }
        else if (city === 'Al Fashir') {
            city = 'الفاشر'
        }
        else if (city === 'Al Ubayyid') {
            city = 'الأبيّض'
        }
        else if (city === 'Kusti') {
            city = 'كوستي'
        }
        else if (city === 'Dongola') {
            city = 'دنقلا'
        }
        else if (city === 'Kadugli') {
            city = 'كادقلي'
        }
        else if (city === 'Al Damazin') {
            city = 'الدمازين'
        }
        else if (city === 'Zalingei') {
            city = 'زالنجي'
        }
        else if (city === 'Al Deain') {
            city = 'الضعين'
        }
        else if (city === 'Al Jinena') {
            city = 'الجنينة'
        }
        else if (city === 'Sennar') {
            city = 'سنار'
        }
        else if (city === 'Al Fulah') {
            city = 'الفولة'
        }
        document.querySelector("#head-city").innerHTML = city
    }
}

const setDropdownList = () => {
    let items = ''
    Cities.map(e => {
        items += `<option value="${e.en}">${e.ar}</option>`
    })
    document.querySelector('#cities-select').innerHTML += items
}

setDropdownList()
getPrayerTimings("")