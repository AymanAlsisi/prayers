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
    document.querySelector('.prayers').innerHTML = `<p class="loading"></p>`
})

setInterval(() => { document.querySelector('.loading').innerHTML += "." }, 400)
setInterval(() => { document.querySelector('.loading').innerHTML = "" }, 1400)


const getPrayerTimings = (city) => {
    let state;
    if (city === "" || city === "no") {
        document.querySelector('.prayers').innerHTML =
            `<div class="empty">
            <p class="empty-text">لم يتم تحديد مدينة بعد</p>
        </div>`
    } else {
        axios.get(`https://api.aladhan.com/v1/timingsByAddress/${myDate}?address=${city}%20Sudan`)
            .then(res => {
                let hiri = `${res.data.data.date.hijri.weekday.ar} ${res.data.data.date.hijri.day} ${res.data.data.date.hijri.month.ar} ${res.data.data.date.hijri.year}`
                let prayers = res.data.data.timings
                document.querySelector('.prayers').innerHTML =
                    `<h3 id="head-hiri">${hiri}</h3>
                    <ul class="prayers-list">
                    <li><p class="prayer-title">الفجر</p><p>${prayers.Fajr}</p></li>
                    <li><p class="prayer-title">الشروق</p><p>${prayers.Sunrise}</p></li>
                    <li><p class="prayer-title">الظهر</p><p>${prayers.Dhuhr}</p></li>
                    <li><p class="prayer-title">العصر</p><p>${prayers.Asr}</p></li>
                    <li><p class="prayer-title">المغرب</p><p>${prayers.Maghrib}</p></li>
                    <li><p class="prayer-title">العشاء</p><p>${prayers.Isha}</p></li>
                    </ul>`
            })
        if (city === 'Atabara') {
            city = 'عطبرة'
            state = "ولاية نهر النيل"
        }
        else if (city === 'Khartoum') {
            city = 'الخرطوم'
            state = "ولاية الخرطوم"
        }
        else if (city === 'Port Sudan') {
            city = 'بورتسودان'
            state = "ولاية البحر الأحمر"
        }
        else if (city === 'Wd Madani') {
            city = 'ود مدني'
            state = "ولاية الجزيرة"
        }
        else if (city === 'Wadi Halfa') {
            city = 'وادي حلفا'
            state = "الولاية الشمالية"
        }
        else if (city === 'Al Qadarif') {
            city = 'القضارف'
            state = "ولاية القضارف"
        }
        else if (city === 'Nyala') {
            city = 'نيالا'
            state = "ولاية جنوب دارفور"
        }
        else if (city === 'Kasala') {
            city = 'كسلا'
            state = "ولاية كسلا"
        }
        else if (city === 'Al Fashir') {
            city = 'الفاشر'
            state = "ولاية شمال دارفور"
        }
        else if (city === 'Al Ubayyid') {
            city = 'الأبيّض'
            state = "ولاية شمال كردفان"
        }
        else if (city === 'Kusti') {
            city = 'كوستي'
            state = "ولاية النيل الأبيض"
        }
        else if (city === 'Dongola') {
            city = 'دنقلا'
            state = "الولاية الشمالية"
        }
        else if (city === 'Kadugli') {
            city = 'كادقلي'
            state = "ولاية جنوب كردفان"
        }
        else if (city === 'Al Damazin') {
            city = 'الدمازين'
            state = "ولاية النيل الأزرق"
        }
        else if (city === 'Zalingei') {
            city = 'زالنجي'
            state = "ولاية وسط دارفور"
        }
        else if (city === 'Al Deain') {
            city = 'الضعين'
            state = "ولاية شرق دارفور"
        }
        else if (city === 'Al Jinena') {
            city = 'الجنينة'
            state = "ولاية جنوب دارفور"
        }
        else if (city === 'Sennar') {
            city = 'سنار'
            state = "ولاية سنار"
        }
        else if (city === 'Al Fulah') {
            city = 'الفولة'
            state = "ولاية غرب كردفان"
        }
        document.querySelector("#head-city").innerHTML = city
        document.querySelector("#head-state").innerHTML = state
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
