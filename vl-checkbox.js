(()=>{const e=document.createElement("template");e.innerHTML=`
        <style>
          @import 'https://cdn.milieuinfo.be/vl-ui-checkbox/0.0.1/style.css';
        </style>

        <label class="vl-checkbox" for="checkbox">
            <input class="vl-checkbox__toggle" type="checkbox" id="checkbox" name="checkbox"/>
            <div class="vl-checkbox__label">
                <i class="vl-checkbox__box" aria-hidden="true"></i>
            </div>
        </label>
    `;class t extends HTMLElement{static get attributes(){return["label","value","checked"]}static get classAttributes(){return["block","single","disabled","error","switch"]}static get observedAttributes(){return t.attributes.concat(t.classAttributes)}constructor(){super(),this._shadowRoot=this.attachShadow({mode:"open"}),this._shadowRoot.appendChild(e.content.cloneNode(!0)),this._labelElement=this._shadowRoot.querySelector(".vl-checkbox"),this._inputElement=this.shadowRoot.querySelector("input"),this._checkboxLabelElement=this._labelElement.querySelector(".vl-checkbox__label")}connectedCallback(){this.classList.add("vl-checkbox"),this._inputElement.onchange=this._toggle}attributeChangedCallback(e,c,i){if(c!=i)switch(t.classAttributes.filter(t=>{return t==e}).forEach(e=>{null!=this.getAttribute(e)?this._labelElement.classList.add("vl-checkbox--"+e):this._labelElement.classList.remove("vl-checkbox--"+e)}),e){case"label":this._labelChangedCallback(i);break;case"value":this._valueChangedCallback(i);break;case"checked":this._checkedChangedCallback(i);break;case"disabled":this._disabledChangedCallback(i);break;case"single":this._singleChangedCallback(i)}}toggle(){this._inputElement.click()}_toggle(){let e;const t=this.getRootNode().host;if(t._checked&&Array.isArray(t._checked)){const c=JSON.parse(this.value);t._checked.indexOf(c)>-1?t._checked.splice(t._checked.indexOf(c),1):t._checked.push(c),e=t._checked,t.setAttribute("checked",JSON.stringify(e))}else e=this.checked;this.dispatchEvent(new CustomEvent("input",{detail:e}))}_labelChangedCallback(e){this._label=e,this._checkboxLabelElement.append(this._label)}_valueChangedCallback(e){this._inputElement.value=e}_checkedChangedCallback(e){try{this._checked=JSON.parse(e)}catch(t){this._checked=void 0!=e}Array.isArray(this._checked)?this._checked.indexOf(JSON.parse(this._inputElement.value))>-1&&(this._inputElement.checked=!0):this._inputElement.checked=this._checked}_disabledChangedCallback(e){this._inputElement.disabled=void 0!=e}_singleChangedCallback(){[...this._checkboxLabelElement.childNodes].filter(this._isTextNode).forEach(this._removeNode);const e=document.createElement("span");e.classList.add("vl-u-visually-hidden"),e.textContent=this._label,this._checkboxLabelElement.appendChild(e)}_isTextNode(e){return 3===e.nodeType}_removeNode(e){e.remove()}}customElements.define("vl-checkbox",t)})();