const BaseRepository = require('./AppBaseRepository');
const constants = require('../constants');

class ProspectRepository extends BaseRepository {
  constructor(options) {
    super({
      ...options,
      collection: 'prospects'
    });
  }

  async create(prospectData) {
    return await this.insert({
      type: prospectData.type,
      body: prospectData.body,
      status: constants.PROSPECT_STATUS.NEW,
      createdBy: constants.SOURCE.WEB_FORM
    });
  }
}

module.exports = ProspectRepository;
