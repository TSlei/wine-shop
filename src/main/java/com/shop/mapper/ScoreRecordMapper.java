package com.shop.mapper;

import java.util.List;

import com.shop.entity.ScoreRecord;

public interface ScoreRecordMapper {
	
	List<ScoreRecord> listScoreRecord();
	
	List<ScoreRecord> getScoreRecordByName(String userName);
	
	Integer insertScoreRecord(ScoreRecord scoreRecord);
	
	Integer deleteScoreRecord(Integer id);
	
	Integer updateScoreRecord(ScoreRecord scoreRecord);
}