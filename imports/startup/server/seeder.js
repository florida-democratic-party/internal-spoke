import { Assignments } from '../../api/assignments/assignments.js'
import { Campaigns } from '../../api/campaigns/campaigns.js'
import { CampaignContacts } from '../../api/campaign_contacts/campaign_contacts.js'
import { CampaignSurveys } from '../../api/campaign_surveys/campaign_surveys.js'

import { Fake } from 'meteor/anti:fake'
import { Meteor } from 'meteor/meteor'
import { Factory } from 'meteor/dburles:factory'
import { _ } from 'meteor/underscore'

const removeData = () => {
  Assignments.remove({})
  Campaigns.remove({})
  CampaignContacts.remove({})
  CampaignSurveys.remove({})
}

const createContacts = (assignmentId, campaignId, contactCount) => {
  _(contactCount).times(() => {
    const eventUrl = `http://bit.ly/${Fake.word(8)}`
    Factory.create('campaign_contact', {
      assignmentId,
      campaignId,
      customFields: { eventUrl } })
  })
}

const createSurveys = (campaignId) => {
  const newSurvey = (parentCampaignSurveyId) => {
    let script = Factory.tree('campaign_survey').script
    script += ' Let us know at <<eventUrl>>!'
    return Factory.create('campaign_survey', {
      script,
      parentCampaignSurveyId,
      campaignId   })
  }

  const parentSurvey = newSurvey(null)
  _(3).range().map(() => newSurvey(parentSurvey._id))
}

const createAssignment = () => {
  const customFields = ['eventUrl']

  const campaign = Factory.create('campaign', { customFields })
  const campaignId = campaign._id

  createSurveys(campaignId)

  const assignment = Factory.create('assignment', {
    campaignId,
    campaign: {
      title: campaign.title,
      description: campaign.description,
      script: campaign.script,
      customFields: campaign.customFields
    }
  })
  createContacts(assignment._id, campaignId, 10)
}


Meteor.startup(() => {
  removeData()

  if (Assignments.find({}).count() === 0) {
    _(2).times(() => {
      createAssignment()
    })
  }
})