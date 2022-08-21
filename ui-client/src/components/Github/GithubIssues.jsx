import React from "react";
import TaskComp from "../TaskComp";
import { Grid } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";

const GithubIssues = ({ issues }) => {
  return (
    <>
      {issues.map((issue, index) => {
        return (
          <Grid.Col key={index} md={3} sm={12}>
            <TaskComp
              key={issue.id}
              id={issue.id}
              description={issue.body}
              date={issue.created_at}
              deadline={issue.milestone}
              members={issue.assignees}
              complete={issue.locked}
              generated={issue.created_at}
              issue={issue.title}
            />
          </Grid.Col>
        );
      })}
    </>
  );
};
export default GithubIssues;
