
class Labels {
  constructor () {
    this.screenLabels = {
      welcomeScreen: {
        base: {
          greeting: 'Awesome job!',
          paragraph1: 'We know better insurance starts with great first impressions. That’s why we’re committed to helping you every step of the way and to ensuring we’re providing the best experience possible.',
          paragraph2: 'We want to sincerely thank you for choosing Liberty Mutual and warmly welcome you to the family.',
          bottomHeaderText: 'Time to make it official!',
          buttonText: "Let's get started &nbsp;»", // Injected directly into dangerouslySetInnerHTML.  NO USER INPUT ALLOWED
        },
        treatmentA: {
          greeting: 'Great job!',
          paragraph1: 'Welcome to Liberty Mutual! We know your time is precious, that’s why we’re committed to getting you set up quickly and back to the life you love.',
          listHeaderText: "Here's what's next:",
          listTextArray: ['Create your account', 'Sign your forms', 'Get to know us - explore your account'],
          buttonText: 'Get Started &nbsp;»', // Injected directly into dangerouslySetInnerHTML.  NO USER INPUT ALLOWED
        },
        common: {
          checkMarkText: 'You just bought a policy',
        },
      },
    }
  }
}
export default new Labels()
