# vl-checkbox
De checkbox laat de gebruiker toe om een of meerdere opties te selecteren uit een lijst. Gebruik de checkbox in formulieren.

## Installatie
```
npm install --save vl-ui-checkbox
```

## Demo
```
npm run demo
```

## Toelichting
De checkbox throwed zelf een input event omdat de native event niet door de shadow root kan doordringen.

Er zijn twee manieren om op een event te luisteren: capturen of op een bubbles. Wanneer we kijken naar de event in de capture fase, van parent naar child,
dan is de `composed` property van de event gelijk aan `true` totdat we aan de input van checkbox komen, vanaf dan is die property gelijk aan `false`.

##### HTML
    <vl-checkbox id="vl-checkbox">
        #shadow-root
        <label ... >
            <input id="input" ... />
            <div ... >
                ...
            </div>
    </vl-checkbox>

##### JS
    let checkbox = document.querySelector('#vl-checkbox');
    checkbox.addEventListener('input', (e) => {
        ...
        // e.composed === true
      }, true); // laatste true om op capture op event te luisteren
    
    let checkboxInput = checkbox.shadowRoot.querySelector('#input');
    checkboxInput.addEventListener('input', (e) => {
        ...
        // e.composed === false
      }, true); // laatste true om op capture op event te luisteren
      

## Credits
Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/webcomponent-vl-ui-checkbox/graphs/contributors) die meegewerkt hebben aan de webcomponent.

## Contact
Heb je suggesties, opmerkingen of tips? Voel je dan vrij om ons te contacteren via help@omgevingvlaanderen.be.