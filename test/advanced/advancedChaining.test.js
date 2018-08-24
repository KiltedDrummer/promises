var expect = require('chai').expect;
var Promise = require('bluebird');
var nock = require('nock');

// NOTE: These tests don't use mocks of any kind
// If test speed or API rate limits become an issue,
// refactor the tests to use mocks, following previous
// `nock` utilizing tests

describe('Advanced chaining', function() {
  var chaining = require('../../exercises/advanced/advancedChaining.js');

  describe('searchCommonConceptsFromGitHubProfiles', function() {
    var searchCommonConceptsFromGitHubProfiles = chaining.searchCommonConceptsFromGitHubProfiles;
    
    before(function() {
      // Nock is a super cool library that makes it easy to test
      // functions that send HTTP requests. Nock intercepts all outgoing
      // requests and allows us to send back any response we want instead.
      // Since no actual requests is ever sent, our tests run faster
      // and we preserve our API rate limits.
      nock('https://api.github.com')
        .get('/users/danthareja')
        .times(4) // Send same response for both tests
        .reply(200, {
          id: 6980359,
          login: 'danthareja',
          name: 'Dan Thareja',
          company: 'Hack Reactor',
          location: 'United States',
          'avatar_url': 'https://avatars3.githubusercontent.com/u/6980359?s=400&v=4'
        });
      nock('https://api.github.com')
        .get('/users/beth')
        .times(4) // Send same response for both tests
        .reply(200, {
          id: 6980359,
          login: 'beth',
          name: 'Beth Johnson',
          company: 'Hack Reactor',
          location: 'United States',
          'avatar_url': 'https://avatars1.githubusercontent.com/u/7968370?s=400&v=4'
        });
      nock('https://api.github.com')
        .get('/users/sunny-g')
        .times(4) // Send same response for both tests
        .reply(200, {
          id: 6980359,
          login: 'sunny-g',
          name: 'Sunny Gonnabathula',
          company: 'Hack Reactor',
          location: 'United States',
          'avatar_url': 'https://avatars2.githubusercontent.com/u/2055636?s=400&v=4'
        });
    });
    
  
    
    it('should return a promise', function() {
      // Must return a Bluebird promise. ES6 promise won't work here
      expect(searchCommonConceptsFromGitHubProfiles(['danthareja'])).to.be.an.instanceOf(Promise);
    });

    it('should resolve to an array of tags', function(done) {
      this.timeout(5000);
      searchCommonConceptsFromGitHubProfiles(['danthareja'])
        .then(function(tags) {
          expect(tags).to.be.an.instanceOf(Array);
          done();
        })
        .catch(done);
    });

    it('should not have duplicate adjectives in the array of tags', function(done) {
      this.timeout(5000);
      searchCommonConceptsFromGitHubProfiles(['danthareja', 'beth'])
        .then(function(tags) {
          var uniques = Object.keys(
            tags.reduce(function(hash, tag) {
              hash[tag] = tag;
              return hash;
            }, {})
          );

          expect(uniques.length).to.equal(tags.length);
          done();
        })
        .catch(done);
    });

    it('should contain the correct tags', function(done) {
      this.timeout(5000);
      searchCommonConceptsFromGitHubProfiles(['danthareja', 'sunny-g'])
        .then(function(tags) {
          expect(tags).to.contain('man');
          done();
        })
        .catch(done);
    });

  });

});
