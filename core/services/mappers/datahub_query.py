dt_query = '''
{
  search(input: { type: DATASET, query: "*", start: 0, count: 10 }) {
    start
    count
    total
    searchResults {
      entity {
         urn
         type
         ...on Dataset {
            name
            description
            schema {
                name
                fields {
                    fieldPath
                    type
                    description
                }
            }
         }
      }
    }
  }
}
'''
