import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Hero from '../components/Hero'

import styles from './index.module.less'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <Hero />
        <div className={styles.portfolioOuter}>
          <div className={styles.portfolioInner}>
            {posts.map(post => {
              if (post.node.path != '/404/') {
                const title = get(post, 'node.frontmatter.title') || post.node.path
                return (
                  <div 
                    className={styles.projectCard}
                    key={post.node.frontmatter.path}
                  >
                    <Link to={post.node.frontmatter.path}>
                      <div className={styles.projectThumb}>

                      </div>
                      <div className={styles.projectInfo}>
                        <h2>{post.node.frontmatter.title}</h2>
                        <p>Filler text.</p>
                        {/* <small>{post.node.frontmatter.date}</small>
                        <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} /> */}
                      </div>
                    </Link>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`