class PolicyListResponseFormatter {
  /**
   * applies filters to a collection of policies
   * @param  {[string]} options.linesOfBuisness - an array of Policy.LineOfBusiness to filter on
   * @param  {string} options.ratingMethod  - a rating method to filter on
   * @param  {[Object]} policies - an array of policies to apply the filtering to
   * @return {[Object]} an array of filtered policy information
   */
  format (options, policies) {
    let formattedPolicies = policies
    if (options.ratingMethod) {
      formattedPolicies = this._filterRatingMethod(options.ratingMethod, formattedPolicies)
    }

    if (options.linesOfBusiness) {
      formattedPolicies = this._filterLinesOfBusiness(options.linesOfBusiness, formattedPolicies)
    }
    return formattedPolicies
  }

  _filterRatingMethod (ratingMethod, policies) {
    return policies.filter(policy => policy.manualOrComputer === ratingMethod)
  }

  _filterLinesOfBusiness (linesOfBusiness, policies) {
    return policies.filter(policy => linesOfBusiness.indexOf(policy.lineOfBusiness) >= 0)
  }
}

module.exports = new PolicyListResponseFormatter()
