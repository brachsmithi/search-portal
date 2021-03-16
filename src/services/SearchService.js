import configData from "./../config.json";

class SearchService {

  async findProgram(searchText) {
    const jsonData = await this.lookUpProgramJson();
    const programs = [];
    for(var i = 0; i < jsonData.program.length; i++) {
      const program = jsonData.program[i];
      if (program.search_field.toLowerCase().includes(searchText?.toLowerCase())) {
        programs.push(program)
      }
    }

    return programs;
  }

  async lookUpProgramJson() {
    if (configData.DATA_SOURCE === 'AWS') {
      return await this.lookUpProgramJsonFromAws();
    } else {
      return await this.lookUpProgramJsonFromPublicFolder();
    }
  }

  async lookUpProgramJsonFromPublicFolder() {
    const source = await fetch(configData.PROGRAM_JSON);
    return await source.json();
  }

  async lookUpProgramJsonFromAws() {
    const aws = require('aws-sdk');
    aws.config.update({
      region: process.env.REACT_APP_S3_BUCKET_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    });
    const s3 = new aws.S3();
    var params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: process.env.REACT_APP_S3_PROGRAM_PATH
    }
    const rawData = await s3.getObject(params).promise();
    const source = rawData.Body.toString('utf-8');
    return await JSON.parse(source);
  }
}

export default SearchService