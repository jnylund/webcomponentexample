export class CustomerWelcome extends HTMLElement {


  htmlTemplate() {
  const template = //html
   `<template id="customer-welcome">
  <style>
    p.welcome-display {
      display: block;
      padding: 20px;
      border-radius: 5px;
      font-size: 3em;
      border: 1px solid #212121;
      color: #212121;
      background: #fff;
    }

    p {
      background: #eb6;
      color: #212121;
      padding: 5px;
    }
  </style>
  <p class="welcome-display">
    <span id="welcome">${this.welcomeMessage()}</span>
  </p>
  <p>
    <!-- A custom description that can be overridden in markup -->
    <slot name="welcome-description">Default welcome description, note the style</slot>
  </p>
</template>`
  return template;

}

static get properties() {
  return {
    welcomeCounter: Number,
  };
}

welcomeMessage() {
  if (this.welcomeCounter == 0)
  {
    return "Thanks for coming first time visitor!"; 
  }
  else
  {
    return `Thanks for visiting, you have been here: ${this.welcomeCounter} times`; 
  }
}

constructor() {
    // Always call parent constructor first
    super();

    let storageCounter = window.localStorage.getItem("welcome-counter");
        if (storageCounter == null)
        {
            this.welcomeCounter = 0;
        }
        else{
            this.welcomeCounter = parseInt(storageCounter);
            this.welcomeCounter = this.welcomeCounter + 1;
        }
    window.localStorage.setItem("welcome-counter", this.welcomeCounter);

   //Kludgy way to create a template from a string since I have no framework right now
   var template = document.createElement('template');
   template.innerHTML = this.htmlTemplate();
   const templateContent = template.content.getElementById("customer-welcome").content;

    // Create new Shadow Root
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      templateContent.cloneNode(true)
    );

  }


 // Called when the element is first connected to the DOM
  connectedCallback() {
    console.log("Connected Callback called")
  }
  // Called when custom element is removed
  disconnectedCallback() {
    console.log("disconnected Callback called")

  }

}

customElements.define("customer-welcome", CustomerWelcome);