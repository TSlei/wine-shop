package com.shop.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shop.entity.ScoreRecord;

@Mapper
public interface ScoreRecordMapper {
	
	List<ScoreRecord> listScoreRecord();
	
	List<ScoreRecord> getScoreRecordByName(String userName);
	
	Integer insertScoreRecord(ScoreRecord scoreRecord);
	
	Integer deleteScoreRecord(Integer id);
	
	Integer updateScoreRecord(ScoreRecord scoreRecord);
}