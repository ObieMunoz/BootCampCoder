import React, { useState, useEffect } from 'react'
import useToken from '../App/useToken'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function GitHubVisualizer() {
    const { bearer } = useToken()
    const github_username = bearer.github_username
    const [gitData, setGitData] = useState([])
    const [gitRepos, setGitRepos] = useState([])


    useEffect(() => {
        if (github_username) {
            fetch(`https://api.github.com/users/${github_username}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setGitData(data)
                })
        }
    }, [])

    useEffect(() => {
        if (gitData) {
            for (let i = 1; i <= Math.ceil(gitData.public_repos / 100); i += 1) {
                if (i <= 6) {
                    fetch(`https://api.github.com/users/${github_username}/repos?page=${i}&per_page=100`)
                        .then(response => response.json())
                        .then(data => {
                            setGitRepos(prevState => [...prevState, ...data])
                        })
                } else {
                    console.log('Due to API rate limitations, only the first 500 repositories are scanned.')
                    break
                }
            }
        }
    }, [gitData])

    console.log(gitRepos)
    const gitRepoList = gitRepos.filter(repo => repo.has_pages === true)

    return (
        <>
            <h2>GitHub Visualizer</h2>
            {/* <img src={gitData.avatar_url} alt="GitHub Avatar" width="250px" /> */}
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">GITHUB ACCOUNT:</StyledTableCell>
                            <StyledTableCell align="center">{gitData.login || "NO ACCOUNT LINKED"}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell align="center">
                                <Avatar
                                    alt={gitData.name}
                                    src={gitData.avatar_url}
                                    sx={{ width: 100, height: 100, margin: 'auto' }}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.name || "NO NAME"}
                            </StyledTableCell>
                        </TableRow>
                        {gitData.twitter_username ? <TableRow>
                            <StyledTableCell align="center">
                                Twitter Username
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.twitter_username}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.public_repos ? <TableRow>
                            <StyledTableCell align="center">
                                Public Repositories
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.public_repos}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.followers ? <TableRow>
                            <StyledTableCell align="center">
                                Followers
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.followers}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.following ? <TableRow>
                            <StyledTableCell align="center">
                                Following
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.following}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.login ? <TableRow>
                            <StyledTableCell align="center">
                                Active GitHub Pages Deployments
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitRepoList.length}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.hireable ? <TableRow>
                            <StyledTableCell align="center">
                                Hireable
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.hireable ? 'Yes' : 'No'}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.company ? <TableRow>
                            <StyledTableCell align="center">
                                Company
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.company}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.blog ? <TableRow>
                            <StyledTableCell align="center">
                                Blog
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.blog}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.location ? <TableRow>
                            <StyledTableCell align="center">
                                Location
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.location}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.email ? <TableRow>
                            <StyledTableCell align="center">
                                E-Mail Address
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.email}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.bio ? <TableRow>
                            <StyledTableCell align="center">
                                Bio
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gitData.bio}
                            </StyledTableCell>
                        </TableRow> : null}
                        {gitData.html_url ? <TableRow>
                            <StyledTableCell align="center">
                                GitHub Link
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <a href={gitData.html_url} target="_blank" rel="noreferrer">{gitData.html_url}</a>
                            </StyledTableCell>
                        </TableRow> : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <p>{JSON.stringify(gitData)}</p> */}
            <br />
            {gitRepoList.length > 0 ? <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">REPOSITORY NAME</StyledTableCell>
                            <StyledTableCell align="center">DEPLOYMENT LINK</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gitRepoList.map(repo => (
                            <TableRow key={repo.id}>
                                <StyledTableCell align="center">
                                    {repo.name.split(/-|_/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <a href={`https://${github_username}.github.io/${repo.name}`} target="_blank" rel="noreferrer">{repo.name}</a>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : null}
        </>
    )
}

export default GitHubVisualizer