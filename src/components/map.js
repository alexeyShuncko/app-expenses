$(document).ready(function () {
    const map = L.map('map').setView([53.9, 27.56], 6);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=HoVAsZnamBouzxZdVK1I', {
        attribution: 'Map data &copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map);

    function tags_adder(data) {

        const coordinates = JSON.parse(data)


        setTimeout(()=> {

        let list = document.getElementById('history')
        
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        coordinates.map(a =>
            list.insertAdjacentHTML("beforeend", `<li>${a.fields.latitude}°, ${a.fields.longitude}°</li>`))
            },3000)
    }

  

    map.on("click", function (e) {
        new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        let array = [e.latlng.lat, e.latlng.lng]
        let coordinates = JSON.stringify(array)
        console.log(array)
        $.post(
            '/create_location',
            {
                'coordinates': coordinates
            });
        $.get('/coordinates_view', tags_adder );

    });
});



